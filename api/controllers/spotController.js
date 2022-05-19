import * as spotModel from "../../models/spotModel.js";

export async function getSpotList(req, res){
    const spotList = await spotModel.getSpotList();
    console.log(spotList);
    res.render("spotlist.ejs", { 'spotList' : spotList });
}

export async function getSpotOne(){

}


