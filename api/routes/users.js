import express from "express";
import * as userController from "../controllers/userController.js";
import { isAuth, isAuthCheck} from "../../services/jwt.js";

const router = express.Router();

// 유저 리스트 확인
router.get("/list", isAuth, userController.getUserList);

// 로그인
router.get("/login", userController.getUserLogin);
router.post("/login", userController.userLogin);

// 카카오 로그인
router.get("/kakao/loginPage", userController.getKakaoUserLogin);
router.get("/kakao/login", userController.getKakaoUserToken);

// 회원가입
router.get("/register", userController.getUserAdd);
router.post("/register", userController.addUser);

// 마이페이지
router.get("/mypage", isAuthCheck, userController.getMyPage);

// 로그아웃
router.get("/logout", userController.userLogout);

export default router;
