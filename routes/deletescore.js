const express = require('express');
const bodyParser = require('body-parser');
let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");
const { User } = require('../models');
const { User_score} = require('../models');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false}));

router.post('/deletescore', function(req, res, next){
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
    let sp = req.body.sp=="표준점수" ? "s" : "p";
    let korean = req.body.korean;
    let math = req.body.math;
    let english = req.body.english;
    let inquiry = req.body.inquiry
    console.log(sp);
    User_score.update({
        korean: korean, 
        english: english, 
        math: math, 
        inquiry: inquiry}, 
        {where: {
            user_id: decoded.user_id,
            month: month, 
            sp: sp,
        }})
    .then(result => {
        res.send('<script type="text/javascript"> alert("수정이 완료되었습니다!");location.href="/userscore" </script>');
    })
    .catch(err => {
        console.log(err);
      });
})

module.exports = router;