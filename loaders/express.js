import express from "express";
import cors from "cors";
import helmet from "helmet";
import users from "../api/routes/users.js";
import spots from "../api/routes/spots.js";
import { config } from "../config/config.js";
import { sequelize } from "../db/mysql.js";
import { connectDB } from "../db/mongoose.js";
import cookieParser from "cookie-parser";

export default async (app) => {

  const corsOptions = {
    origin: "*",
    credentials:true
  }

  // 기본 미들웨어
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors(corsOptions));
  app.use(helmet({
    contentSecurityPolicy:false,
    crossOriginEmbedderPolicy:false,
  }));
  // app.use(helmet.contentSecurityPolicy(config.csp));


  app.set("view engine", "ejs");

  // 라우팅
  app.use("/users", users);
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
    console.log('SuccessFully connected to mysql')
  });

  // mongoose
  connectDB().then(()=> {
    console.log('SuccessFully connected to mongodb');
  }).catch(e => console.error(e));

  return app;
};
