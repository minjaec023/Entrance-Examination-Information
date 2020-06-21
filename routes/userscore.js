const express = require('express');
const bodyParser = require('body-parser');
let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");
const { User } = require('../models');
const { User_score} = require('../models');
const router = express.Router();

const modifyuserscore = require('./modifyuserscore.js');
const insertscore = require('./insertscore.js');
const deletescore = require('./deletescore.js');

router.use(modifyuserscore);
router.use(insertscore);
router.use(deletescore);

router.use(bodyParser.urlencoded({ extended: false}));

router.get('/userscore', function(req, res, next){
    let token = req.cookies.user;
    let isAuthenticated;
    let decoded;
    let results = [];
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
    let user_name;
    let division;
    //아이디, 이름 받아오기
    User.findOne({
        where: {user_id : decoded.user_id},
    })
    .then((user) => {
        user_name = user.user_name;
        division = user.division == 1 ? '문과' : '이과';
    })
    .then(() => {
        User_score.findAll({
            where: {user_id : decoded.user_id}
        })
        .then((scores) => {
            for(let i=0;i<scores.length;i++){
                results.push(scores);
            }
            res.render("userscore", {
                isAuthenticated : isAuthenticated,
                user_id : decoded.user_id,
                user_name : user_name,
                results: scores,
                division: division
            });
        });
    });
});

module.exports = router;