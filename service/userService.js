const UserMapper = require("../mappers/userMapper");
const bcrypt = require("bcryptjs");
const constants = require("../config/constants");
const db = require("express");
const res = require("express/lib/response");
const CustomException = require("../common/exception");

class UserService {
    static async getAllUsers() {
        //调用数据访问层，从数据库获取数据并返回
        return await UserMapper.getAllUsers()
    }

    static async register(username, password, phoneNumber) {
        //1.根据用户名查找数据库，如果结果不为空，抛出用户已注册异常
        let [user]=await UserMapper.getUserByUsername(username)
        if(user.length===1){
            throw new CustomException(50012,"用户名已占用")
        }
        //2.加密用户密码
        password=bcrypt.hashSync(password, constants.SALT_ROUNDS)
        //3.将用户信息写入数据库，如果影响行数为1，插入成功,返回影响行数
        let [result] = await UserMapper.insertUser(username, password, phoneNumber)
        if(result.affectedRows!==1){
            throw new CustomException(50002,'数据库异常')
        }
        return result.affectedRows
    }

    static async login(username, password) {
        //1.根据用户名查找数据库，如果结果为空，抛出用户未注册异常
        let [user]=await UserMapper.getUserByUsername(username)
        if(user.length!==1){
            throw new CustomException(50011,'用户尚未注册')
        }
        //2.验证用户的密码与数据库中是否相同，返回true或false
        return await bcrypt.compare(password, user[0].password)
    }
}

module.exports = UserService