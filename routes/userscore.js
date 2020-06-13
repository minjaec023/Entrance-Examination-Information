const express = require('express');
const bodyParser = require('body-parser');
let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");
const { User } = require('../models');
const { User_score} = require('../models');
const router = express.Router();

const modifyuserscore = require('./modifyuserscore.js');

router.use(modifyuserscore);

router.use(bodyParser.urlencoded({ extended: false}));

router.get('/userscore', function(req, res, next){
    let token = req.cookies.user;
    let isAuthenticated;
    let decoded;
    let user_name;
    
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
    //아이디, 이름 받아오기
    User_score.findOne({
        where: {month : 6},
        include: [{
            model: User,
            where: {user_id : decoded.user_id}
        }]
    })
    .then((user) => {
        console.log(user);
        try {
            user_name = user.User.user_name;
            res.render('userscore', {
                isAuthenticated : isAuthenticated, 
                user_id : decoded.user_id, 
                user_name : user_name,
                month : user.month,
                sp : user.sp,
                korean : user.korean,
                math : user.math,
                english : user.english,
                inquiry : user.inquiry
            });
        } catch (error) {
            console.log(error);
        }
    });
    //점수 받아오기
    //
});

module.exports = router;