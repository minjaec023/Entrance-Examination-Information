const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const login = require('./routes/login.js');
app.use(login);
const signup = require('./routes/signup.js');
app.use(signup);
const recom = require('./routes/recom.js');
app.use(recom);
const review = require('./routes/review.js');
app.use(review);

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req, res){
    res.render('main.ejs')
});

app.listen(3000, function(){
    console.log('port 3000');
});