const express = require('express');
const bodyParser = require('body-parser');
let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");
const { User } = require('../models');
const { User_score} = require('../models');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false}));

router.get('/modifyuserscore', function(req, res, next){
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
    User.findOne({
        where:{
            user_id: decoded.user_id
        }
        
    })
    .then((user) => {
        try {
            user_name = user.user_name;
            res.render('userscore', {isAuthenticated : isAuthenticated, user_id : decoded.user_id, user_name : user_name});
        } catch (error) {
            console.log(error);
        }
    });
});

router.post('/userscore', function(req, res, next){
    
})

module.exports = router;