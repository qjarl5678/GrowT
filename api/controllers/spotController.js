import * as spotModel from "../../models/spotModel.js";

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
  const contentsid = req.params.contentsid;
  const spotInfo = await spotModel.getOneSpot(contentsid);
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
