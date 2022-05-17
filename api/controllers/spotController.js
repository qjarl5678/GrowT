

export async function getSpotList(){
    const spotList = await spotModel.getSpotList();

    res.render("spotlist.ejs");
}