const db = require("../models/db")
const bcrypt = require("bcrypt")

exports.submitLogin = async (req, res) => {
    const {username, password} = req.body
    if (!username || !password) {
        res.status(200).json({code: 20002, message: "登录数据非法"})
    } else {
        try {
            const [result] = await db.query(
                'SELECT * FROM user WHERE username = ?',
                [username],
            )
            if (result.length > 0) {
                const existedPassword = result[0].password
                const allowance = await bcrypt.compare(password, existedPassword)
                if (allowance) {
                    res.status(200).send({code: 20003, message: '登录成功'})
                } else {
                    res.status(200).send({code: 20004, message: '用户名或密码错误'})
                }
            }else{
                res.status(200).send({code:20005, message:'该账号尚未注册'})
            }
        } catch (error) {
            console.error('Database error:', error)
            res.status(500).send('Internal Server Error')
        }
    }
}