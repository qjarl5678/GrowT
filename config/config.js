import dotenv from "dotenv";
dotenv.config();
function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`key ${key} is undefined`);
  }
  console.log(value);
  return value;
}
export const config = {
  jwt: {
    secretKey : required("JWT_SECRET"),
    expiresInSec: required("JWT_EXPIRES_SEC"),
  },
  bcrypt: {
    saltRounds : required("BCRYPT_SALT_ROUNDS"),
  },
  db: {
    host: required("DB_HOST"),
    user: required("DB_USER"),
    database: required("DB_DATABASE"),
    password: required("DB_PASSWORD"),
    port: required("DB_PORT"),
  },
  mdb: {
    host: required("MDB_HOST"),
  },
  csp : {
    directives: {
      defaultSrc:["'self'",'https://*.navercorp.com'],
      scriptSrc:["'self'",'https://openapi.map.naver.com',"'unsafe-inline'", 'https://*.pstatic.net'],
      imgSrc:["'self'",'https://api.cdn.visitjeju.net','https://*.pstatic.net']
    }
  }
};
