import jwt from 'jsonwebtoken';
import {config} from '../config/config.js';
import * as userModel from '../models/userModel.js';

const {secretKey, expiresInSec} = config.jwt;

const AUTH_ERROR = { message: 'Authentication Error' };

// jwt accessToken 생성
export function createJwtToken(id) {
    return jwt.sign({id}, secretKey, {expiresIn : expiresInSec});
}

// jwt refreshToken 생성
export function createRefreshToken(){
    return jwt.sign({}, secretKey,{expiresIn : '14d'} );
}

// 쿠키 인증기반
export const isAuth = async(req, res, next) => {
    console.log(req.cookies);
    const { accessToken } = req.cookies;
    if(!accessToken){
      return res.status(401).json(AUTH_ERROR);
    }
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


/* bearer 인증기반
export const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, secretKey, async (error, decoded) => {
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
};
*/