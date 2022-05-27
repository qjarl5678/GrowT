import express from "express";
import {isAuth} from "../../services/jwt.js";
import * as spotController from "../controllers/spotController.js";

const router = express.Router();

// 관광지 리스트 페이지 가져오기
router.get("/", spotController.getSpotList);

// 관광지 리스트 일부 가져오기 fetch
router.get("/:num", spotController.getSpots);

// 관광지 정보 가져오기
router.get("/info/:contentsid", spotController.getSpotOne);


export default router;