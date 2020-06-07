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

router.get('/review', function(req, res, next){
    res.render('review');
});

module.exports = router;