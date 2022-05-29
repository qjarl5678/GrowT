import { config } from "../config/config.js";
import fetch from "node-fetch";

const { key, redirectUrl } = config.kakao;

export async function getAccessToken(token) {
  const requestUrl =
    "https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=" +
    key +
    "&redirect_uri=" +
    redirectUrl +
    "&code=" +
    token;
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const tokenInfo = await fetch(requestUrl, {
    method: "POST",
    headers,
  });
  return await tokenInfo.json();
  /* 반환 값 정보
  {
    access_token: 'Lnfp_qNDAV0pG30UZejW8OiwaQ49nh8phQjHdbIbCj1ymAAAAYELPNQG',
    token_type: 'bearer',
    refresh_token: '6_tphsHvdCiWRX1l9kim3lMDiJpC1nYgyISJzyZICj1ymAAAAYELPNQE',
    expires_in: 7199,
    scope: 'birthday account_email profile_image gender profile_nickname',
    refresh_token_expires_in: 5183999
  } */
}

export async function getKakaoUserInfo(tokenInfo){
    const requestUrl ="https://kapi.kakao.com/v2/user/me";
    const headers = {
        Authorization: `Bearer ${tokenInfo.access_token}`,
    };

    const kakaoUserInfo = await fetch(requestUrl, {
        method:"GET",
        headers,
    });
    return await kakaoUserInfo.json();
}