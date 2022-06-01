import * as userModel from "../../models/userModel.js";
import { createJwtToken, createRefreshToken } from "../../services/jwt.js";
import bcrypt from "bcrypt";
import { config } from "../../config/config.js";
import * as kakaoApi from "../../services/kakaoAPI.js";

const { saltRounds } = config.bcrypt;
const cookieSetting = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60,
};

// 사용자 로그인 페이지 호출
export async function getUserLogin(req, res) {
  res.render("login.ejs");
}

// 카카오톡 로그인 페이지 호출
export async function getKakaoUserLogin(req, res) {
  res.render("kakaologin.ejs");
}

// 카카오톡 로그인 로직
export async function getKakaoUserToken(req, res) {
  // 1. 인가코드 받기
  const token = req.query.code;
  // 2. 받은 인가코드로 accessToken 받기
  const tokenInfo = await kakaoApi.getAccessToken(token);
  // 3. 받은 accessToken으로 카카오톡 사용자 정보 받아오기
  const kakaoUserInfo = await kakaoApi.getKakaoUserInfo(tokenInfo);
  // 4. 사용자 정보로 받아온 ID가 DB에 있는지 확인
  const user = await userModel.findByUserId(kakaoUserInfo.id);
  console.log(kakaoUserInfo);
  // 아이디가 DB예 없으면
  if (!user) {
    // 회원가입 창으로 보내기(카카오에서 준 정보를 가지고 미리 입력 폼에 넣어두기)
    return res
      .status(200)
      .json({
        userId: kakaoUserInfo.id, // ID는 불변 
        userName: kakaoUserInfo.kakao_account.profile.nickname, // Name은 변경 가능
        userEmail: kakaoUserInfo.kakao_account.email, // 이메일도 변경가능
        userGender: kakaoUserInfo.kakao_account.gender, // 젠더도.. 변경가능..?
      });
  } else {
    // 있으면 로그인 시키기
    const accessToken = createJwtToken(user.userId);
    // httpOnly는 보안때문에 설정 / 쿠키 시간은 1시간
    res.cookie("accessToken", accessToken, cookieSetting);
    res.status(200).json({ accessToken, userId });
  }
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
  res.cookie("accessToken", accessToken, cookieSetting);
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
  if (await userModel.createUser(user)) {
    res.status(200).json({ code: "100" });
  } else {
    res.status(500).json({ message: "srv error" });
  }
}

// 사용자 리스트 가져오기
export async function getUserList(req, res) {
  res.send(await userModel.getUserList());
}
