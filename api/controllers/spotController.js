import * as spotModel from "../../models/spotModel.js";
import * as spotLikeModel from "../../models/spotLikeModel.js";

// 관광지 전체 리스트 불러오기
export async function getSpotList(req, res) {
  const spotList = await spotModel.getSpotList();
  res.render("spotlist.ejs", {
    spotList: spotList,
    method: "all",
    value: "none",
  });
  // res.status(200).json(spotLists); // React사용시
}

// 관광지 전체 리스트 불러오기
export async function getSpotList100(req, res) {
  const spotList = await spotModel.getSpotList();
  res.render("spotlist.ejs", {
    spotList: spotList,
    method: "all",
    value: "none",
  });
  // res.status(200).json(spotLists); // React사용시
}

// 카테고리 별 리스트 불러오기(c1:관광지, c3:숙박, c4:음식점)
export async function getCategoryList(req, res) {
  const contentsValue = req.params.contentsValue;
  const categoryList = await spotModel.getCategoryList(contentsValue);
  console.log(categoryList + contentsValue);
  res.render("spotlist.ejs", {
    spotList: categoryList,
    method: "category",
    value: contentsValue,
  });
  // res.status(200).json(categoryList); // React사용시
}

// 관광지 전체 리스트 10개씩 순차적으로 가져오기
export async function getSpots(req, res) {
  const num = req.params.num;
  const spotNum = num * 10;
  const spotList = await spotModel.getSpots(spotNum);
  res.status(200).json(spotList);
}

// 관광지 전체 카테고리별로 10개씩 순차적으로 가져오기
export async function getCategorySpots(req, res) {
  const num = req.params.num;
  const contentValue = req.params.contentsValue;
  const spotNum = num * 10;
  const spotList = await spotModel.getCategorySpots(spotNum, contentValue);
  res.status(200).json(spotList);
}

export async function getLimitTagSpots(req, res) {
  const num = req.params.num;
  let tagId = req.params.tagId;
  let tagLast = "";
  if (!req.params.tagLast) {
  } else {
    console.log(req.params.tagLast);
    tagLast = req.params.tagLast;
    tagId = tagId + "/" + tagLast;
  }
  // 넘버가 아닐 경우 해쉬태그 중 / 슬레쉬가 들어간 태그가 있으므로 해당 태그를 찾는 로직 작성
  if (isNaN(num)) {
    const data = num + "/" + tagId;
    const tagSpotsList = await spotModel.getTagSpots(data);
    res.render("spotlist.ejs", {
      spotList: tagSpotsList,
      method: "tag",
      value: data,
    });
    // 아닐 경우 원래 로직대로 10개씩 찾는걸로
  } else {
    const spotNum = num * 10;
    const spotList = await spotModel.getLimitTagSpots(spotNum, tagId);
    res.status(200).json(spotList);
  }
}

// 관광지 ID를 기준으로 1개만 가져오기
export async function getSpotOne(req, res) {
  const userId = req.userId;
  const contentsId = req.params.contentsId;
  const info = {
    userid: userId,
    contentsid: contentsId,
  };
  let spotInfo = await spotModel.getOneSpot(contentsId);
  let method = '';
  if (userId) {
    const result = await spotLikeModel.checkSpotLike(info);
    if(result){
      method ='on';
    }else{
       method='off';
    }
  } 
  res.render("spotinfo.ejs", { spotInfo: spotInfo[0], method});
  // res.status(200).json(spotInfo[0]); // React사용시
}

// 태그를 눌렀을 때 해당 태그에 속한 관광지 리스트만 가져오기
export async function getTagSpots(req, res) {
  const tagId = req.params.tagId;
  const tagSpotsList = await spotModel.getTagSpots(tagId);
  res.render("spotlist.ejs", {
    spotList: tagSpotsList,
    method: "tag",
    value: tagId,
  });
  // res.status(200).json(tagSpotsList); // React사용시
}

// 이름을 기준으로 포함된 리스트 가져오기
export async function getSearchNameSpots(req, res) {
  const name = req.params.name;
  const searchSpotsList = await spotModel.getSearchNameSpots(name);
  res.status(200).json(searchSpotsList); // React사용시
}

// 좋아요 누르기
export async function changeLike(req, res) {
  const userId = req.userId;
  const contentsId = req.params.contentsId;
  const info = {
    userid: userId,
    contentsid: contentsId,
  };



  // 만약 userId가 없으면 로그인되지 않아 누를 수 없다는 안내하기
  if (!userId) {
    res.status(401).json({result:3});
  } else {
    // 우선 사용자 ID와 관광지 ID로 조회해서 사용자가 좋아요를 누른적이 있었는지 체크해보기
    const result = await spotLikeModel.checkSpotLike(info);
    // 값이 없으면 데이터 추가
    if (!result) {
      await spotLikeModel.changeSpotLike(info);
      await spotModel.plusLikeNum(info.contentsid);
      const spot = await spotModel.getLikeNum(info.contentsid);
      console.log(spot);
      console.log(spot.likeNum);
      const data = {
        result:1,
        likeNum:spot.likeNum,
      }
      res.status(200).json(data);
      // 있으면 데이터 삭제
    } else {
      await spotLikeModel.deleteSpotLike(info);
      await spotModel.minusLikeNum(info.contentsid);
      const spot = await spotModel.getLikeNum(info.contentsid);
      const data = {
        result:2,
        likeNum:spot.likeNum,
      }
      res.status(200).json(data);
    }
  }
}

export async function getMapPage(req, res) {
  res.render("spotmap.ejs");
}

export async function getMapData(req, res) {
  const spotList = await spotModel.getSpotList100();
  res.status(200).json(spotList);
}

