const express = require('express');
const bodyParser = require('body-parser');
const {User} = require('../models');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false}));

router.get('/signup', function(req, res, next){
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
    res.render("signup", {
        isAuthenticated,
      });
});

router.post('/signup', function(req, res, next){
    var id = req.body.userid;
    var name = req.body.name;
    var pw = req.body.password;
    var division = req.body.division;
    User.findOne({
        where:{
            user_id: id
        }
    })
    .then((user) => {
        if(user) res.send('<script type="text/javascript"> alert("이미 존재하는 아이디입니다!");location.href="/signup" </script>');
        else {
            User.create({user_id: id, user_name: name, user_pw: pw, division: division})
            .then(result => {
                res.send('<script type="text/javascript"> alert("회원가입이 완료되었습니다!"); location.href="/"</script>');
            })
            .catch(err => {
                console.error(err);
            });
        }
    });
    
});

module.exports = router;