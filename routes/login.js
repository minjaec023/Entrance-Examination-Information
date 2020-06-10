const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const {User} = require('../models');

router.use(bodyParser.urlencoded({ extended: false}));

router.get('/login', function(req, res, next){
    res.render('login');
});

router.post('/login', function(req, res, next){
    let id = req.body.userid;
    let pw = req.body.password;
    User.findOne({where:{user_id:id}})
        .then((user) => {
            if(!user) res.send('<script type="text/javascript"> alert("아이디를 다시 확인해주세요!");location.href="/login" </script>');
            else if(user.user_pw === pw){
                res.send('<script type="text/javascript"> alert("환영합니다!"); location.href="/"</script>');
            }
            else  res.send('<script type="text/javascript"> alert("비밀번호를 다시 확인해주세요!"); location.href="/login"</script>');
        });
});

module.exports = router;