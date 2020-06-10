const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false}));

router.get('/recom', function(req, res, next){
    res.render('recom');
});

module.exports = router;