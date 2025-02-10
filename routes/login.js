const express = require('express');
const {submitLogin} = require('../controllers/loginController');
const router = express.Router();

router.post('/', submitLogin)

module.exports = router;