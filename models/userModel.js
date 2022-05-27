import { sequelize } from "../db/mysql.js";
import SQ from 'sequelize';
const DataTypes = SQ.DataTypes;

export const User = sequelize.define('users', {
  userId: {
    type: DataTypes.STRING(50),
    primaryKey: true,
  },
  userPw : {
    type : DataTypes.STRING(100),
    allowNull: false,
  }, 
  userName : {
    type : DataTypes.STRING(50),
    allowNull: false,
  }, 
  userMail : {
    type : DataTypes.STRING(100),
    allowNull: false,
  }, 
  userAddr1 : {
    type : DataTypes.STRING(100),
    allowNull: false,
  }, 
  userAddr2 : {
    type : DataTypes.STRING(100),
    allowNull: false,
  }, 
  regDate : {
    type : DataTypes.DATE,
    allowNull: false,
  }, 
}, { timestamps:false});

export async function createUser(user){
  return User.create(user).then(data => {console.log(data); return data;}).catch((err) => {console.log(err)});
}

export async function findByUserId(userId){
  return User.findOne({ where:{userId}});
}

export async function getUserList(){
  return User.findAll({});
}




// import { db } from "../db/mysql.js";

/* 유저 생성 
export async function createUser(user) {
  return db
    .execute("insert into users (userId, userPw, userName, userMail, userAddr1, userAddr2, regDate) values (?,?,?,?,?,?,?,?)", user)
    .then((result) => console.log(`${result} 등록됨`));
}

// 모든 유저 가져오기
export async function getUser() {
  return db
    .execute("select * from users")
    .then((result) => {return result[0]});
}
*/