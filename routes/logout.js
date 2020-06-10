const express = require('express');

const router = express.Router();


router.get('/logout', function(req, res, next){
    res.cookie('user', '');
    res.send('<script type="text/javascript"> alert("로그아웃 되었습니다.");location.href="/" </script>')
});

module.exports = router;

