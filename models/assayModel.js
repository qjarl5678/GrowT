import mongoose from "mongoose";

const { Schema } = mongoose;

const assaySchema = new Schema({
  userId : {type: String},
  title: { type: String },
  address: { type: String },
  tag: [String],
  introduction: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  imgpath: { type: String },
  formatTime: {type: String},
  Time: {type: Date, default: Date.now},
  likeNum : {type : Number},
});


const Assay = mongoose.model("assay", assaySchema, "assay");

// 게시글 등록하기
export async function addAssay(assay) {
    return await Assay.insertMany(assay);
}
  
// ID로 조회해서 게시글 가져오기
export async function getUserAssay(userId){
    return await Assay.find({userId}).sort({Time:-1});
}
export async function getAllAssay(){
    return await Assay.find({}).sort({Time:-1});
}

// 좋아요 1 늘리기
export async function plusLikeNum(contentsid) {
    return await Assay.updateOne({ _id:contentsid },{"$inc":{likeNum:1}});
  }
  
  // 좋아요 1 줄이기
  export async function minusLikeNum(contentsid) {
    return await Assay.updateOne({ _id:contentsid },{"$inc":{likeNum:-1}});
  }
  
  // 좋아요 개수 반환
  export async function getLikeNum(contentsid) {
    return await Assay.findOne({ _id:contentsid });
  }
  