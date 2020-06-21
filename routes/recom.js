const express = require("express");
const bodyParser = require("body-parser");
let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");
const { Router } = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const { University, UnivLocation } = require("../models");
const { UnivCriteria } = require("../models");
const { EngRatio } = require("../models");
const { Department } = require("../models");
const { User_score } = require("../models");

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

  let list = [];

  User_score.findAll({
    where: { user_id: decoded.user_id },
  }).then((scores) => {
    if (scores.length == 0) {
      res.send(
        '<script type="text/javascript"> alert("먼저 성적을 입력해주세요!");location.href="/insertscore" </script>'
      );
    }
    console.log("ooo");
    for (let score of scores) {
      let result = {};
      result.month = score.month;
      result.sum = score.korean + score.math + score.inquiry;
      result.eng = score.english;
      result.sp = score.sp == "s" ? "표준점수" : "백분위";

      list.push(result);

      if (list.length == scores.length)
        res.render("recom", {
          list,
          isAuthenticated,
        });
    }
  });
});

router.get("/showrecom/:score", function (req, res, next) {
  const score = req.params.score;
  let keyword = req.query.keyword !== undefined ? req.query.keyword : "";
  let location = req.query.location !== undefined ? req.query.location : "";
  let keyword_like = "%" + keyword + "%";
  let location_like = "%" + location + "%";

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

  Department.findAll({
    include: [
      {
        model: University,
      },
    ],
    where: {
      standard_score: { [Op.lt]: score },
      depart_name: { [Op.like]: keyword_like },
    },
    order: [["standard_score", "DESC"]],
    limit: 10,
  }).then(function (results) {
    let list = [];
    let locationlist = [];
    let countlist = [];
    let count = 0;
    while (count < results.length) {
      let temp = results[count++];
      UnivLocation.findOne({
        where: {
          univ_id: temp.University.univ_id,
          city: { [Op.like]: location_like },
        },
      }).then(function (result) {
        if (result !== null) {
          list.push(temp);
          locationlist[temp.univ_id] = result.city;
        }
        countlist.push(result);
        if (countlist.length == results.length) {
          res.render("showrecom", {
            std_score: score,
            list,
            locationlist,
            isAuthenticated,
            keyword: keyword,
            location: location,
          });
        }
      });
    }
  });
});

router.get("/criterias/:division", function (req, res, next) {
  let token = req.cookies.user;
  let isAuthenticated;
  let division = req.params.division;
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

  UnivCriteria.findAll({
    include: [{ model: University }],
    where: { division: division },
  }).then(function (result) {
    res.render("showcriteria", {
      criterias: result,
      univ_name: result[0].University.univ_name,
      division: division,
      isAuthenticated,
    });
  });
});

router.get("/calcgrade/:division", function (req, res, next) {
  let token = req.cookies.user;
  let isAuthenticated;
  let decoded;
  let division = req.params.division;

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

  let list = [];
  User_score.findOne({
    where: { user_id: decoded.user_id },
  }).then(function (score) {
    UnivCriteria.findAll({
      include: [{ model: University }],
      where: { division: division },
    }).then(function (results) {
      for (let result of results) {
        let calc = {};
        calc.univ_name = result.University.univ_name;
        let korean = result.c_korean * score.korean;
        let math = result.c_math * score.math;
        let inquiry = result.c_inquiry * score.inquiry;
        let en;

        EngRatio.findOne({ where: { univ_id: result.University.univ_id } })
          .then(function (en_ratio) {
            switch (score.english) {
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
            if (list.length === results.length) {
              list.sort(function (a, b) {
                return a.grade > b.grade ? -1 : a.grade < b.grade ? 1 : 0;
              });
              res.render("showgrade", { list: list.sort(), isAuthenticated });
            }
          });
      }
    });
  });
});

module.exports = router;
