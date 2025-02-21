const jwt = require('jsonwebtoken')
const constants = require('../config/constants')

const generateToken = (username) => {
    return jwt.sign({username}, constants.JWT_SECRET_KEY, {expiresIn: '1h'})
}

//验证token是否有效，返回值为true或false
const verifyToken = (token) => {
    try{
        jwt.verify(token, constants.JWT_SECRET_KEY)
        return true
    }catch (err) {
        return false
    }
}

module.exports = {generateToken, verifyToken}