import Mongoose from "mongoose";
import {config} from "../config/config.js"

export async function connectDB() {
    return Mongoose.connect(config.mdb.host, {
        useNewUrlParser:true,
        useUnifiedTopology: true,
        //useFindAndModify: false,
    });
}