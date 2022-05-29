import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import * as userModel from "../models/userModel.js";

const { secretKey, expiresInSec } = config.jwt;

const AUTH_ERROR = { message: "Authentication Error" };

// jwt accessToken 생성
export function createJwtToken(id) {
  return jwt.sign({ id }, secretKey, { expiresIn: expiresInSec });
}

// jwt refreshToken 생성
export function createRefreshToken() {
  return jwt.sign({}, secretKey, { expiresIn: "14d" });
}

// 쿠키 인증기반
export const isAuth = async (req, res, next) => {
  console.log(req.cookies);
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return res.status(401).json(AUTH_ERROR);
  } else {
    jwt.verify(accessToken, secretKey, async (error, decoded) => {
      if (error) {
        return res.status(401).json(AUTH_ERROR);
      }
      const user = await userModel.findByUserId(decoded.id);
      if (!user) {
        return res.status(401).json(AUTH_ERROR);
      }
      req.userId = user.id; // req.customData
      next();
    });
  }
};

// 쿠키 인증기반(인증은 하나 해당 페이지에서 로그인이 안되어있어도 되는 경우)
export const isAuthCheck = async (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
      next();
  } else {
    jwt.verify(accessToken, secretKey, async (error, decoded) => {
      if (error) {
        return res.status(401).json(AUTH_ERROR);
      }
      const user = await userModel.findByUserId(decoded.id);
      if (!user) {
        return res.status(401).json(AUTH_ERROR);
      }
      req.userId = user.userId; // req.customData
      next();
    });
  }
};
