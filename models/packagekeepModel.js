import mongoose from "mongoose";

const Schema = mongoose;

const packageSchema = new Schema({
    userId : {type: String},
    companyName: { type: String },
    introduction: { type: String },
    startTime: {type: Number},
    endTime: {type: Number},
    phone: {type: String},
    address: { type: String },
    addressDetail: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    imgpath: { type: String },
    Time: {type: Date, default: Date.now},
    maxPackage: {type: Number},
    packStatus: {type: String},
})

const packageKeep = mongoose.model("packageKeep", packageSchema, "packageKeep");
