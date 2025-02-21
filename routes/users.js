const express = require('express')
const router = express.Router()
const UserController = require("../controllers/userController")

/* GET users listing. */
router.get('/list',UserController.getAll )
router.post('/register',UserController.register )
router.post('/login',UserController.login )
//demo
router.post('/token-verify',UserController.tokenVerify)

module.exports = router;
