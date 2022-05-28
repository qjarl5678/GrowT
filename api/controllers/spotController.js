import * as spotModel from "../../models/spotModel.js";
import * as spotLikeModel from "../../models/spotLikeModel.js";

// 관광지 전체 리스트 불러오기
export async function getSpotList(req, res) {
  const spotList = await spotModel.getSpotList();
  res.render("spotlist.ejs", { spotList: spotList });
}

// 카테고리 별 리스트 불러오기(c1:관광지, c3:숙박, c4:음식점)
export async function getCategoryList(req, res) {
  const contentsValue = req.params.contentsValue;
  const categoryList = await spotModel.getCategoryList(contentsValue);
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
  const contentValue = req.query.contentValue;
  const spotNum = num * 10;
  const spotList = await spotModel.getCategorySpots(spotNum, contentValue);
  res.status(200).json(spotList);
}

// 관광지 ID를 기준으로 1개만 가져오기
export async function getSpotOne(req, res) {
  const contentsId = req.params.contentsId;
  const spotInfo = await spotModel.getOneSpot(contentsId);
  res.render("spotinfo.ejs", { spotInfo: spotInfo[0] });
}

// 태그를 눌렀을 때 해당 태그에 속한 관광지 리스트만 가져오기
export async function getTagSpots(req, res) {
  const tagId = req.params.tagId;
  const tagSpotsList = await spotModel.getTagSpots(tagId);
  res.render("spottaglist.ejs", { spotList: tagSpotsList });
}

// 이름을 기준으로 포함된 리스트 가져오기
export async function getSearchNameSpots(req, res) {
  const name = req.params.name;
  const searchSpotsList = await spotModel.getSearchNameSpots(name);
  console.log(searchSpotsList);
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
    res.send(
      `<script type="text/javascript">alert("로그인되지 않아 누를 수 없습니다"); window.location=history.go(-1);</script>`
    );
  } else {
    // 우선 사용자 ID와 관광지 ID로 조회해서 사용자가 좋아요를 누른적이 있었는지 체크해보기
    const result = await spotLikeModel.checkSpotLike(info);
    // 값이 없으면 데이터 추가
    if (!result) {
      await spotLikeModel.changeSpotLike(info);
      // 있으면 데이터 삭제
    } else {
      await spotLikeModel.deleteSpotLike(info);
    }
  }
}
