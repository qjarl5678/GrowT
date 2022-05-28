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
