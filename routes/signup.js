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

router.get('/signup', function(req, res, next){
    res.render('signup');
});

router.post('/signup', function(req, res, next){
    var id = req.body.userid;
    var name = req.body.name;
    var pw = req.body.password;
    var sql_select = 'SELECT * FROM USER WHERE USER_ID=?';
    var sql_insert = 'INSERT INTO USER(USER_ID, USER_NAME, USER_PW) VALUES(?,?,?)';
    var params = [id, name, pw];
    var check = true;
    conn.query(sql_select, [id], function(err, results){
        if(err) console.log(err);
        if(results[0]){
            check = false;
            return res.send('<script type="text/javascript"> alert("이미 존재하는 아이디입니다!");location.href="/signup"; </script>');
        }
    });
    if(check){
        conn.query(sql_insert, params, function(err, results){
            if(err){
                console.log(err);
            }else{
                console.log(results);
                return res.send('<script type="text/javascript"> alert("회원가입이 완료되었습니다!");location.href="/main"; </script>');
            }
        });
    }
});

module.exports = router;