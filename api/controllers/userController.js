import * as userModel from "../../models/userModel.js";
import { createJwtToken, createRefreshToken } from "../../services/jwt.js";
import bcrypt from "bcrypt";
import { config } from "../../config/config.js";

const { saltRounds } = config.bcrypt;

// 사용자 로그인 페이지 호출
export async function getUserLogin(req, res) {
  res.render("login.ejs");
}

export async function getKakaoUserLogin(req, res) {
  res.render("kakaologin.ejs");
}

export async function getKakaoUserToken(req, res) {
  const accessToken = req.query.code;
  console.log(accessToken);
}

// 사용자 로그인 로직
export async function userLogin(req, res) {
  const { userId, userPw } = req.body;
  const user = await userModel.findByUserId(userId);
  if (!user) {
    return res.status(401).json({ message: "Invalid user or password" });
  }
  const isValidPassword = await bcrypt.compare(userPw, user.userPw);
  if (!isValidPassword) {
    return res.status(401).json({ message: " Invalid user or password" });
  }
  const accessToken = createJwtToken(user.userId);
  // httpOnly는 보안때문에 설정 / 쿠키 시간은 1시간
  res.cookie("accessToken", accessToken, { httpOnly: true });
  res.status(200).json({ accessToken, userId });
}

// 사용자 생성 페이지 호출
export async function getUserAdd(req, res) {
  res.render("register.ejs");
}

// 사용자 생성 로직
export async function addUser(req, res) {
  const user = req.body;
  const found = await userModel.findByUserId(user.userId);
  if (found) {
    res.status(409).json({ message: `${user.userId} already exists` });
  }
  const hased = await bcrypt.hash(user.userPw, parseInt(saltRounds));
  user.regDate = new Date();
  user.userPw = hased;
  user.refreshToken = "";
  console.log(user);
  if (await userModel.createUser(user)) {
    res.status(201).json({ message: "post userId" });
  } else {
    res.status(500).json({ message: "srv error" });
  }
}

// 사용자 리스트 가져오기
export async function getUserList(req, res) {
  res.send(await userModel.getUserList());
}
