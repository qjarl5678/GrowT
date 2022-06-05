import * as spotModel from "../../models/spotModel.js";
import * as assayModel from "../../models/assayModel.js";
import * as spotLikeModel from "../../models/spotLikeModel.js";

// 메인 페이지 호출
export async function mainView(req, res) {
  const data = await spotModel.getLikeRank();

  const assay = await assayModel.getAllAssay();
  res.render("main.ejs", {data, assay});
}
