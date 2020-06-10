const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const login = require('./routes/login.js');
const signup = require('./routes/signup.js');
const recom = require('./routes/recom.js');
const review = require('./routes/review.js');

const seqeulize = require('./models').sequelize;
const app = express();
seqeulize.sync();

app.use(login);
app.use(signup);
app.use(recom);
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