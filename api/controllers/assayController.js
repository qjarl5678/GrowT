import * as kakaoAPI from "../../services/kakaoAPI.js";
import path from "path";
import { fileURLToPath } from "url";
import * as assayModel from "../../models/assayModel.js";
import * as assayLikeModel from "../../models/assayLikeModel.js";
import moment from "moment";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getAssayPage(req, res) {
  const data = await assayModel.getAllAssay();
  const userId = req.userId;
  const promises = [];
  if (userId) {
    for (let i = 0; i < data.length; i++) {
      const info = {
        userId,
        contentsid: data[i]._id.toString(),
      };

      const result = await assayLikeModel.checkIdLike(info);

      if(!result){
        promises.push(0);
      } else {
        promises.push(1);
      }
      
      await Promise.all(promises);
    }
  }

  res.render("tripassay.ejs", { data, promises });
}

export async function getMyAssayPage(req, res) {
  const userId = req.userId;
  let data = "";
  if (!userId) {
    res.send(
      "<script>alert('로그인 하지 않아 접근 불가합니다'); history.go(-1);</script>"
    );
  } else {
    data = await assayModel.getUserAssay(userId);
  }
  res.render("mytripassay.ejs", { userId, data });
}

export async function postAssay(req, res) {
  const time = new Date().getTime();
  let savePath =
    __dirname +
    "../../../public/img/assayUserImg/" +
    time +
    "_" +
    req.files.file.name;
  let tag = req.body.tag.split(" ");
  const addressXY = await kakaoAPI.xyAddress(req.body.address);

  const file = req.files.file;
  console.log(__dirname);

  const assay = {
    userId: req.userId,
    title: req.body.title,
    address: req.body.address,
    tag,
    introduction: req.body.introduction,
    latitude: addressXY.y,
    longitude: addressXY.x,
    imgpath: "/img/assayUserImg/" + time + "_" + req.files.file.name,
    formatTime: moment().format("YYYY-MM-DD HH:mm:ss"),
    likeNum: 0,
  };

  console.log(assay);

  file.mv(savePath, async (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ data: "error" });
    } else {
      await assayModel.addAssay(assay);
      res.status(200).json({ data: "success" });
    }
  });
}

export async function getUserPage(req, res) {
  const userId = req.params.id;
}

export async function getAssayData(req, res) {
  const userId = req.query.userID;
  console.log(userId);
}

// 좋아요 누르기
export async function changeLike(req, res) {
  const userId = req.userId;
  const contentsId = req.params.contentsId;
  const info = {
    userid: userId,
    contentsid: contentsId,
  };

  // 만약 userId가 없으면 로그인되지 않아 누를 수 없다는 안내하기
  if (!userId) {
    res.status(401).json({ result: 3 });
  } else {
    // 우선 사용자 ID와 관광지 ID로 조회해서 사용자가 좋아요를 누른적이 있었는지 체크해보기
    const result = await assayLikeModel.checkSpotLike(info);
    // 값이 없으면 데이터 추가
    if (!result) {
      await assayLikeModel.changeSpotLike(info);
      await assayModel.plusLikeNum(info.contentsid);
      const spot = await assayModel.getLikeNum(info.contentsid);
      const data = {
        result: 1,
        likeNum: spot.likeNum,
      };
      res.status(200).json(data);
      // 있으면 데이터 삭제
    } else {
      await assayLikeModel.deleteSpotLike(info);
      await assayModel.minusLikeNum(info.contentsid);
      const spot = await assayModel.getLikeNum(info.contentsid);
      const data = {
        result: 2,
        likeNum: spot.likeNum,
      };
      res.status(200).json(data);
    }
  }
}
