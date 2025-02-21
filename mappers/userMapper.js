const db = require("../config/db");

class UserMapper {
    //获取所有用户列表
    static async getAllUsers() {
        return db.query('SELECT * FROM user')
    }

    //根据用户名查找用户
    static async getUserByUsername(username){
        return db.query('SELECT * FROM user WHERE username = ?', username)
    }

    //插入用户
    static async insertUser(username, password, phoneNumber) {
        return db.query(
            'INSERT into user (username, password, phoneNumber) VALUES (?, ?, ?)',
            [username, password, phoneNumber]
        )
    }
}

module.exports = UserMapper