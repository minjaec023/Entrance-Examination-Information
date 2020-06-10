const express = require('express');
const bodyParser = require('body-parser');
let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false}));

router.get('/recom', function(req, res, next){
    let token = req.cookies.user;
    let isAuthenticated;
    let decoded;
    try {
        decoded = jwt.verify(token, secretObj.secret);
    } catch (error) {
        decoded = false;
    }
    if(decoded){
        isAuthenticated = true;
    }
    else{
        isAuthenticated = false;
    }
    res.render('recom', {isAuthenticated : isAuthenticated});
});

module.exports = router;