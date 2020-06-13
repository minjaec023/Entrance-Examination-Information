const express = require("express");
const bodyParser = require("body-parser");
let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");
const { Router } = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const { University } = require("../models");
const { UnivCriteria } = require("../models");
const { EngRatio } = require("../models");
const { Department } = require("../models");

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

router.get("/showrecom", function (req, res, next) {
  const { kor_p, mat_p, inq_p } = req.query;
  const { kor_s, mat_s, inq_s } = req.query;
  let sum_s = parseInt(kor_s) + parseInt(mat_s) + parseInt(inq_s);
  Department.findAll({
    include: [{ model: University }],
    where: { standard_score: { [Op.lt]: sum_s } },
    order: [["standard_score", "DESC"]],
  }).then(function (result) {
    res.render("showrecom", {
      std_score: sum_s,
      result,
    });
  });
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

router.post("/calcgrade", function (req, res, next) {
  const { kor_s, mat_s, inq_s } = req.body;
  const { eng } = req.body;
  let list = [];
  UnivCriteria.findAll({
    include: [{ model: University }],
  }).then(function (results) {
    for (let result of results) {
      let calc = {};
      calc.univ_name = result.University.univ_name;
      let korean = result.c_korean * kor_s;
      let math = result.c_math * mat_s;
      let inquiry = result.c_inquiry * inq_s;
      let en;

      EngRatio.findOne({ where: { univ_id: result.University.univ_id } })
        .then(function (en_ratio) {
          switch (eng) {
            case "1":
              en = en_ratio.first_grade;
              break;
            case "2":
              en = en_ratio.second_grade;
              break;
            case "3":
              en = en_ratio.third_grade;
              break;
            case "4":
              en = en_ratio.fourth_grade;
              break;
            case "5":
              en = en_ratio.fifth_grade;
              break;
            case "6":
              en = en_ratio.sixth_grade;
              break;
            default:
              en = 0;
          }
          en = en * result.c_english;
          calc.grade = (korean + math + inquiry + en) / 100;
        })
        .then(() => {
          list.push(calc);
          if (list.length === results.length)
            res.render("showgrade", { list: list });
        });
    }
  });
});

module.exports = router;
