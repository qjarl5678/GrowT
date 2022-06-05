import mongoose from "mongoose";

const { Schema } = mongoose;

const assayLikeSchema = new Schema(
  {
    contentsid: { type: String },
    userid: { type: String },
  },
  {
    versionKey: false,
  }
);

const assayLike = mongoose.model("assayLike", assayLikeSchema, "assayLike");

// 좋아요 추가하기
export async function changeSpotLike(info) {
  return await assayLike.insertMany(info);
}

// 좋아요 삭제하기
export async function deleteSpotLike(info) {
  await assayLike.deleteOne(info);
}

// 좋아요 되어있는지 체크 해보기
export async function checkSpotLike(info) {
  return await assayLike.findOne(info);
}

export async function checkIdLike(info){
  return await assayLike.findOne({userid:info.userId, contentsid:info.contentsid});
}