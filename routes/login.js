const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const dbConfig = require('../dbConfig');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false}));

const dbOptions = {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
};

const conn = mysql.createConnection(dbOptions);
conn.connect();

router.get('/login', function(req, res, next){
    res.render('login');
});

router.post('/login', function(req, res, next){
    var id = req.body.userid;
    var pw = req.body.password;
    var sql = 'SELECT * FROM USER WHERE USER_ID=?';
    conn.query(sql, [id], function(err, results){
        if(err) console.log(err);
        if(!results[0])
            return res.send('<script type="text/javascript"> alert("아이디를 다시 확인해주세요!");location.href="/login"; </script>');
        var user = results[0];
        
        if(pw === user.USER_PW){
            return res.send(
            '<script type="text/javascript"> alert("환영합니다!");location.href="/"; </script>'
            );
        }
        else {
            return res.send('<script type="text/javascript"> alert("비밀번호를 다시 확인해주세요!");location.href="/login"; </script>');
        }
    });
});

module.exports = router;