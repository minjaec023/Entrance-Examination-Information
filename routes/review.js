const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false}));


router.get('/review', function(req, res, next){
    res.render('review');
});

router.get('/writereview', function(req, res, next){
    res.render('writereview');
});

router.get('/showreview', function(req, res, next){
    res.render('showreview');
});

module.exports = router;