import * as userModel from "../../models/userModel.js";
import { createJwtToken } from "../../services/jwt.js";
import bcrypt from "bcrypt";
import {config} from '../../config/config.js';

const {saltRounds}= config.bcrypt;


// 사용자 로그인 페이지 호출 
export async function getUserLogin(req, res) {
  res.render("login.ejs");
}

// 사용자 로그인 로직
export async function userLogin(req, res){
  const { userId, userPw } = req.body;
  const user = await userModel.findByUserId(userId);
  if(!user){
    return res.status(401).json({message: 'Invalid user or password'});
  }
  const isValidPassword = await bcrypt.compare(userPw, user.userPw);
  if(!isValidPassword){
    return res.status(401).json({message: ' Invalid user or password'});
  }
  const token = createJwtToken(user.userId);
  // httpOnly는 보안때문에 설정 / 쿠키 시간은 1시간
  res.cookie('accessToken',token,{httpOnly:true, maxAge: 60 * 60 * 1000});
  res.status(200).json({token, userId});
}

// 사용자 생성 페이지 호출
export async function getUserAdd(req, res) {
  res.render("register.ejs");
}

// 사용자 생성 로직
export async function addUser(req, res) {
  const user = req.body;
  const found = await userModel.findByUserId(user.userId);
  if(found){
    res.status(409).json({message: `${user.userId} already exists`});
  }
  const hased = await bcrypt.hash(user.userPw, parseInt(saltRounds));
  user.regDate = new Date();
  user.userPw = hased;
  if(await userModel.createUser(user)){
    res.status(201).json({message: 'post userId'});
  } else {
    res.status(500).json({message:"srv error"});
  }
}


export async function getUserList(req, res) {
  res.send(await userModel.getUserList());
}
