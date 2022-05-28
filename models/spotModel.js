import mongoose from "mongoose";

const { Schema } = mongoose;

const spotSchema = new Schema({
  contentsid: { type: String },
  contentsvalue: { type: String },
  contentslabel: { type: String },
  title: { type: String },
  address: { type: String },
  roadaddress: { type: String },
  tag: [String],
  introduction: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  phoneno: { type: String },
  photoid: { type: Number },
  imgpath: { type: String },
  thumbnailpath: { type: String },
});

const Tour = mongoose.model("Tour", spotSchema, "Tour");

// 관광지 전체 리스트 불러오기
export async function getSpotList() {
  return await Tour.find({}).limit(10);
}

// 관광지 전체 리스트 10개씩 순차적으로 가져오기
export async function getSpots(num) {
  return await Tour.find({}).skip(num).limit(10);
}

// 관광지 전체 카테고리별 리스트 10개씩 순차적으로 가져오기
export async function getCategorySpots(num, contentValue) {
  return await Tour.find({ contentsvalue: contentValue }).skip(num).limit(10);
}

// 관광지 ID를 기준으로 1개만 가져오기
export async function getOneSpot(contentsId) {
  return await Tour.find({ contentsid: contentsId });
}

// 태그를 눌렀을 때 해당 태그에 속한 관광지 리스트만 가져오기
export async function getTagSpots(tagId) {
  return await Tour.find({ tag: { $in: tagId } });
}

// 카테고리 별 리스트 불러오기(c1:관광지, c3:숙박, c4:음식점)
export async function getCategoryList(contentValue) {
  return await Tour.find({ contentsvalue: contentValue });
}

// 이름을 기준으로 포함된 리스트 가져오기
export async function getSearchNameSpots(title) {
  return await Tour.find({ title: { $regex: title } });
}
