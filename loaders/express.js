import express from "express";
import cors from "cors";
import favicon from "serve-favicon";
import morgan from "morgan";
import helmet from "helmet";
import users from "../api/routes/users.js";
import spots from "../api/routes/spots.js";
import { config } from "../config/config.js";
import { sequelize } from "../db/mysql.js";
import { connectDB } from "../db/mongoose.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// es6 이상 module에서는 __dirname 미제공으로 아래와같이 작성해야됨
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async (app) => {
  const corsOptions = {
    origin: "*",
    credentials: true,
  };

  // 기본 미들웨어
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser()); // 쿠키 파서
  app.use(cors(corsOptions)); // cors 라이브러리
  app.use(morgan("tiny")); // 로깅 라이브러리
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    })
  );
  // app.use(helmet.contentSecurityPolicy(config.csp));

  // favicon 설정
  app.use(favicon(path.join(__dirname, "../public/img", "favicon.ico")));

  app.set("view engine", "ejs");

  // 라우팅
  // 유저 관련된
  app.use("/users", users);
  // 관광지 관련된
  app.use("/spots", spots);

  // 에러처리
  app.use((req, res, next) => {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
  });
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: {},
      },
    });
  });

  // mysql
  sequelize.sync().then((client) => {
    console.log("SuccessFully connected to mysql");
  });

  // mongoose
  connectDB()
    .then(() => {
      console.log("SuccessFully connected to mongodb");
    })
    .catch((e) => console.error(e));

  return app;
};
