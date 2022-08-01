import mongoose from "mongoose";

const Schema = mongoose;

const packageSchema = new Schema({
    userId : {type: String},
    title: { type: String },
    address: { type: String },
    introduction: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    imgpath: { type: String },
    formatTime: {type: String},
    Time: {type: Date, default: Date.now},
    maxPackage: {type: Number},
    packStatus: {type: String},
})

const packageKeep = mongoose.model("packageKeep", packageSchema, "packageKeep");
