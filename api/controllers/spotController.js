import * as spotModel from "../../models/spotModel.js";

export async function getSpotList(req, res){
    const spotList = await spotModel.getSpotList();
    //console.log(spotList);
    //res.header("Cross-Origin-Embedder-Policy","credentialless");
    res.render("spotlist.ejs", { 'spotList' : spotList });
}

export async function getSpots(req, res){
    const num = req.params.num;
    const spotNum = num * 10;
    const spotList = await spotModel.getSpots(spotNum);
    res.status(200).json(spotList);
}

export async function getSpotOne(req, res){
    const contentsid = req.params.contentsid;
    const spotInfo = await spotModel.getOneSpot(contentsid);
    res.render("spotinfo.ejs", {'spotInfo': spotInfo[0]});
}


