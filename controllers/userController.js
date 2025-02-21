const UserService = require("../service/userService")
const CustomException = require("../common/exception");
const {generateToken, verifyToken} = require("../utils/jwtUtils");
const res = require("express/lib/response");

class UserController {
    //获取所有用户
    static async getAll(req, res) {
        try {
            //判断请求头里是否含有token
            let token = req.headers.authorization
            if (!token) {
                return res.status(401).send("No token provided")
            }
            if (!verifyToken(token)) {
                return res.status(401).send("Invalid token provided")
            }
            //1.调用业务层方法，获取用户列表
            let [users] = await UserService.getAllUsers()
            console.log(users)
            //2.通过res返回
            if (users.length > 0) {
                res.status(200).send(users)
            }
        } catch (error) {
            res.status(500).send('Internal Server Error')
        }
    }

    //注册用户
    static async register(req, res) {
        //1.从req中获取注册的表单信息username,password,confirmPassword,phoneNumber
        let {username, password, confirmPassword, phoneNumber} = req.body
        //2.判断必填信息是否为空，为空直接返回提示
        if (!username || !password || !confirmPassword) {
            return res.status(200).send({code: 50000, message: '必填信息不完整'})
        }
        if(username.length<8||username.length>16){
            return res.status(200).send({code:50009, message:'用户名格式不正确'})
        }
        if(password.length<8||password.length>24){
            return res.status(200).send({code:50013, message:'密码格式不正确'})
        }
        //3.判断密码与确认密码是否相同，如果不同返回提示信息
        if (password !== confirmPassword) {
            return res.status(200).send({code: 50001, message: '两次密码不一致'})
        }
        //4.调用业务层注册方法
        try {
            await UserService.register(username, password, phoneNumber)
            res.status(200).send({code: 20000, message: '注册成功'})
        } catch (err) {
            if (err instanceof CustomException) {
                // res.status(200).json(err)
                res.status(200).json({code: err.code, message: err.message})
            } else {
                res.status(200).send({code: 50010, message: err.message})
            }
        }
    }

    //用户登录
    static async login(req, res) {
        //1.从req中获取登录的表单信息username,password
        let {username, password} = req.body
        //2.判断用户名或密码是否为空，为空直接返回提示
        if (!username || !password) {
            return res.status(200).send({code: 50000, message: '必填信息不完整'})
        }
        //3.调用业务层登录方法
        try {
            let result = await UserService.login(username, password)
            if (result) {
                let token = generateToken(result)
                res.status(200).send({
                    code: 20001,
                    message: '登录成功',
                    data: {token: token}
                })
            } else {
                res.status(200).send({code: 50003, message: '用户名或密码错误'})
            }
        } catch (err) {
            if (err instanceof CustomException) {
                res.status(200).json({code: err.code, message: err.message})
            } else {
                res.status(200).send({code: 50004, message: err.message})
            }
        }
    }

    // demo
    static async tokenVerify(req, res) {
        let {token} = req.body
        if (!token) {
            return res.status(200).send({code: 50007, message: "No token provided"})
        }
        if (!verifyToken(token)) {
            return res.status(200).send({code: 50008, message: "Invalid token provided"})
        }
        res.status(200).send({code: 20010, message: "Pass"})
    }
}

module.exports = UserController