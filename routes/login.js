const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const {User} = require('../models');
const cookies = require("cookie-parser");

router.use(cookies())

let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");

router.use(bodyParser.urlencoded({ extended: false}));

router.get('/login', function(req, res, next){
    let token = req.cookies.user;
    let isAuthenticated;
    let decoded;
    try {
        decoded = jwt.verify(token, secretObj.secret);
    } catch (error) {
        decoded = false;
    }
    if (decoded) {
        isAuthenticated = true;
    } else {
        isAuthenticated = false;
    }
    res.render("login", {
        isAuthenticated,
      });
});

router.post('/login', function(req, res, next){
    let id = req.body.userid;
    let pw = req.body.password;
    
    User.findOne({
        where:{
            user_id: id
        }
    })
    .then((user) => {
        if(!user) res.send('<script type="text/javascript"> alert("아이디를 다시 확인해주세요!");location.href="/login" </script>');
        else if(user.user_pw === pw){
            let token = jwt.sign({
                user_id: id
            },
            secretObj.secret ,
            {
                expiresIn: '100m'
            })
            res.cookie("user", token);
            res.send('<script type="text/javascript"> alert("환영합니다!"); location.href="/"</script>');
        }
        else  res.send('<script type="text/javascript"> alert("비밀번호를 다시 확인해주세요!"); location.href="/login"</script>');
    });
});

module.exports = router;