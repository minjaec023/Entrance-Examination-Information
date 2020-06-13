const express = require("express");
const bodyParser = require("body-parser");
let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");
const { Router } = require("express");
const router = express.Router();

const { University } = require("../models");
const { UnivCriteria } = require("../models");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/recom", function (req, res, next) {
  let token = req.cookies.user;
  let isAuthenticated;
  let decoded;
  try {
    decoded = jwt.verify(token, secretObj.secret);
  } catch (error) {
    decoded = false;
  }
  if (decoded) {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }
  res.render("recom", { isAuthenticated: isAuthenticated });
});

router.get("/criterias/:division", function (req, res, next) {
  let token = req.cookies.user;
  let isAuthenticated;
  let division = req.params.division;

  UnivCriteria.findAll({
    include: [{ model: University }],
    where: { division: division },
  }).then(function (result) {
    res.render("showcriteria", {
      criterias: result,
      univ_name: result[0].University.univ_name,
      division: division,
    });
  });
});

module.exports = router;
