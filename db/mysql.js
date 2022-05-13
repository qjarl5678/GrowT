// import mysql from "mysql2";
import { config } from "../config/config.js";
import SQ from 'sequelize';

const {host, user, database, password, port} = config.db;
console.log(host, user);

export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  dialect:'mysql',
  port,
});

/* 기본 mysql2 이용할 때
export const pool = mysql.createPool({
  host,
  user,
  database,
  password,
  port,
});

export const db = pool.promise();
*/
