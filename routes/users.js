const express = require('express');
const cons=require('../config/constants')
const {getUserByUsername} = require("../controllers/userController");
const router = express.Router();

/* GET users listing. */
router.get('/', getUserByUsername)

module.exports = router;
