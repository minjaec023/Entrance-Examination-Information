const express = require('express');
const bodyParser = require('body-parser');
let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");
const { User } = require('../models');
const { User_score} = require('../models');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false}));

router.get('/insertscore', function(req, res, next){
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
    res.render("insertscore", {
        isAuthenticated : isAuthenticated
    });
})
router.post('/insertscore', function(req, res, next){
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
    let month = req.body.month;
    let sp = req.body.sp;
    let korean = req.body.korean;
    let math = req.body.math;
    let english = req.body.english;
    let inquiry = req.body.inquiry
    if(!month || !sp || !korean || !math || !english || !inquiry){
        res.send('<script type="text/javascript"> alert("정보를 모두 입력해주세요!");location.href="/insertscore" </script>');
    }
    else{
        User_score.create({user_id: decoded.user_id, month: month, sp: sp, korean: korean, english: english, math: math, inquiry: inquiry})
        .then(result => {
            res.send('<script type="text/javascript"> alert("입력이 완료되었습니다!");location.href="/userscore" </script>');
        })
        .catch(err => {
            res.send('<script type="text/javascript"> alert("이미 등록된 정보입니다!");location.href="/insertscore" </script>');
        })
    }
})

module.exports = router;