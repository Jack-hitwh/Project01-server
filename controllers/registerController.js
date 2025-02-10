const db = require("../models/db");
const bcrypt = require("bcrypt");
const constants = require("../config/constants");

exports.submitRegister = async (req, res) => {
    const {username, password, number} = req.body
    try {
        const [result] = await db.query(
            'SELECT * FROM user WHERE username = ?',
            [username],
        )
        if (result.length > 0) {
            res.status(200).send({code:20001, message:"用户已存在"})
        } else {
            const hashedPassword = await bcrypt.hash(password, constants.SALT_ROUNDS)
            const [result1] = await db.query(
                'INSERT INTO user (username, password, phoneNumber) VALUES (?, ?, ?)',
                [username, hashedPassword, number],
            )
            res.status(200).send({code:20000, message:'注册成功'})
        }
    } catch (error) {
        console.error('Database error:', error)
        res.status(500).send('Internal Server Error')
    }
}