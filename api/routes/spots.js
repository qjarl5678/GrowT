import express from "express";
import { isAuth, isAuthCheck } from "../../services/jwt.js";
import * as spotController from "../controllers/spotController.js";

const router = express.Router();

// 관광지 리스트 페이지 가져오기
router.get("/", spotController.getSpotList);

// 관광지 전체 리스트 10개씩 순차적으로 가져오기
router.get("/:num", spotController.getSpots);

// 관광지 전체 카테고리별로 10개씩 순차적으로 가져오기
router.get("/category/:num", spotController.getCategorySpots);

// 태그를 눌렀을 때 해당 태그에 속한 관광지 리스트만 가져오기
router.get("/tag/:tagId", spotController.getTagSpots);

// 이름을 기준으로 포함된 리스트 가져오기
router.get("/search/:name", spotController.getSearchNameSpots);

// 관광지 ID를 기준으로 1개만 가져오기
router.get("/info/:contentsId", spotController.getSpotOne);

router.get("/like/:contentsId", isAuthCheck, spotController.changeLike);

export default router;
