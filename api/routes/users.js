import express from "express";
import * as userController from "../controllers/userController.js";
import {isAuth} from "../../services/jwt.js";

const router = express.Router();


// 유저 리스트 확인
router.get("/list", isAuth, userController.getUserList);

// 로그인
router.get('/login', userController.getUserLogin);
router.post('/login', userController.userLogin);

// 회원가입
router.get("/register", userController.getUserAdd);
router.post("/register", userController.addUser);


export default router;
