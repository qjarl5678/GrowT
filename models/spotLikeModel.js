import mongoose from "mongoose";

const { Schema } = mongoose;

const spotLikeSchema = new Schema({
  contentsid: { type: String },
  userid : {type:String},
  like : {type: String},
});

const spotLike = mongoose.model("spotLike", spotLikeSchema, "SpotLike");

// 관광지 전체 리스트 불러오기
export async function changeSpotLike(info) {
  return await spotLike.insertMany(info);
}
