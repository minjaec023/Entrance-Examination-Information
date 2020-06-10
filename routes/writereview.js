const express = require('express');
const bodyParser = require('body-parser');
let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false}));

module.exports = router;