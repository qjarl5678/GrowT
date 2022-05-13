import express from "express";
import cors from "cors";
import helmet from "helmet";
import users from "../api/routes/users.js";
import { sequelize } from "../db/mysql.js";
import cookieParser from "cookie-parser";

export default async (app) => {
  // 기본 미들웨어
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors());
  app.use(helmet());


  app.set("view engine", "ejs");

  // 라우팅
  app.use("/users", users);

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

  sequelize.sync().then((client) => {
    console.log(client)
  });

  /* DB 연결
  db.getConnection().then((connection) => console.log("DB Connected"));
  */

  return app;
};
