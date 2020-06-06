var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var crypto = require('crypto');
var dbConfig = require('./dbConfig');

var app = express();
var dbOptions = {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
};

var conn = mysql.createConnection(dbOptions);
conn.connect();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req, res){
    res.send('<a href="/login">login</a>');
});
app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', function(req, res){
    var id = req.body.userid;
    var pw = req.body.password;
    var sql = 'SELECT * FROM USER WHERE USER_ID=?';
    conn.query(sql, [id], function(err, results){
        if(err) console.log(err);
        if(!results[0])
            return res.send('<script type="text/javascript"> alert("아이디를 다시 확인해주세요!"); </script>');
        var user = results[0];
        
        if(pw === user.USER_PW){
            var username = user.USER_NAME;
            return res.send(
            '<script type="text/javascript"> alert("환영합니다!"); </script>'
            );
        }
        else {
            return res.send('<script type="text/javascript"> alert("비밀번호를 다시 확인해주세요!"); </script>');
        }
    });
});

app.listen(3000, function(){
    console.log('port 3000');
});