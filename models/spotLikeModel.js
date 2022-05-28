import mongoose from "mongoose";

const { Schema } = mongoose;

const spotLikeSchema = new Schema(
  {
    contentsid: { type: String },
    userid: { type: String },
  },
  {
    versionKey: false,
  }
);

const SpotLike = mongoose.model("SpotLike", spotLikeSchema, "SpotLike");

// 좋아요 추가하기
export async function changeSpotLike(info) {
  return await SpotLike.insertMany(info);
}

// 좋아요 삭제하기
export async function deleteSpotLike(info) {
  await SpotLike.deleteOne(info);
}

// 좋아요 되어있는지 체크 해보기
export async function checkSpotLike(info) {
  return await SpotLike.findOne(info);
}
