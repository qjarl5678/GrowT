import mongoose from 'mongoose';

const { Schema } = mongoose;

const spotSchema = new Schema({
    contentsid : { type : String },
    contentsvalue : { type : String },
    contentslabel: { type : String },
    title : { type : String },
    address : { type : String },
    roadaddress : { type : String },
    tag : [String],
    introduction : { type : String },
    latitude : { type : Number },
    longitude : { type : Number },
    phoneno : { type : String },
    photoid : { type : Number },
    imgpath : { type : String },
    thumbnailpath : { type : String }
});

const Tour = mongoose.model('Tour', spotSchema,'Tour');

export async function getSpotList(){
    return await Tour.find({}).limit(10);
}

export async function getSpots(skip) {
    return await Tour.find({}).skip(skip).limit(10);
}
  
export async function getOneSpot(contentsid){
    return await Tour.find({'contentsid' : contentsid});
}
