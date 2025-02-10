const express = require('express');
const {submitRegister} = require("../controllers/registerController");
const router = express.Router();

router.post('/', submitRegister)

module.exports = router;