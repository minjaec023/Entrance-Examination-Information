const express = require('express');
const bodyParser = require('body-parser');
let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false}));


router.get('/review', function(req, res, next){
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
    res.render('review', {isAuthenticated : isAuthenticated});
});

router.get('/writereview', function(req, res, next){
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
    res.render('writereview', {isAuthenticated : isAuthenticated});
});

router.get('/showreview', function(req, res, next){
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
    res.render('showreview', {isAuthenticated : isAuthenticated});
});

module.exports = router;