import express from "express";
import * as assayController from "../controllers/assayController.js";
import { isAuth, isAuthCheck } from "../../services/jwt.js";

const router = express.Router();

router.get("/", isAuthCheck, assayController.getAssayPage);
router.get("/user/:id", isAuthCheck, assayController.getUserPage);
router.post("/post", isAuthCheck, assayController.postAssay);
router.get("/data", isAuthCheck, assayController.getAssayData);
router.get("/myassay", isAuthCheck, assayController.getMyAssayPage);

// 좋아요 눌려있는지 확인하여 눌려있으면 추가, 안눌려있으면 삭제 처리
router.get("/like/:contentsId", isAuthCheck, assayController.changeLike);
export default router;
