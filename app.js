const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

let jwt = require("jsonwebtoken");
let secretObj = require("./config/jwt");

const login = require('./routes/login.js');
const signup = require('./routes/signup.js');
const recom = require('./routes/recom.js');
const review = require('./routes/review.js');
const logout = require('./routes/logout.js');

const seqeulize = require('./models').sequelize;
const app = express();
seqeulize.sync();

app.use(login);
app.use(signup);
app.use(recom);
app.use(review);
app.use(logout);

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req, res){
    let token = req.cookies.user;
    let isAuthenticated;
    let decoded;
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
    res.render('main', {isAuthenticated : isAuthenticated});
});

app.listen(3000, function(){
    console.log('port 3000');
});