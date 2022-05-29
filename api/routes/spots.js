import express from "express";
import { isAuth, isAuthCheck } from "../../services/jwt.js";
import * as spotController from "../controllers/spotController.js";

const router = express.Router();

// 관광지 리스트 페이지 가져오기
router.get("/", isAuthCheck, spotController.getSpotList);

// 관광지 전체 리스트 10개씩 순차적으로 가져오기
router.get("/:num", isAuthCheck, spotController.getSpots);

// 관광지 전체 카테고리별로 10개씩 순차적으로 가져오기
router.get("/category/:contentsValue", isAuthCheck, spotController.getCategoryList);

// 관광지 전체 카테고리별로 10개씩 순차적으로 가져오기
router.get("/category/:num/:contentsValue", isAuthCheck, spotController.getCategorySpots);

// 태그를 눌렀을 때 해당 태그에 속한 관광지 리스트만 가져오기
router.get("/tag/:tagId", isAuthCheck, spotController.getTagSpots);

// 태그를 눌렀을 때 해당 태그에 속한 관광지 리스트 10개씩 가져오기
router.get("/tag/:num/:tagId", isAuthCheck, spotController.getLimitTagSpots);

// 이름을 기준으로 포함된 리스트 가져오기
router.get("/search/:name", isAuthCheck, spotController.getSearchNameSpots);

// 관광지 ID를 기준으로 1개만 가져오기
router.get("/info/:contentsId", isAuthCheck, spotController.getSpotOne);

// 좋아요 눌려있는지 확인하여 눌려있으면 추가, 안눌려있으면 삭제 처리
router.get("/like/:contentsId", isAuthCheck, spotController.changeLike);

export default router;
