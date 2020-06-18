const express = require('express');
const bodyParser = require('body-parser');
let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");
const router = express.Router();
const { Review } = require('../models');

var fs = require('fs')
var mysql = require('mysql')
var ejs = require('ejs');
const { start } = require('repl');

router.use(bodyParser.urlencoded({ extended: false}));



//리뷰 페이징

router.get("/pasing/:cur", function (req, res) {

    //페이지당 게시물 수 : 한 페이지 당 10개 게시물
    var page_size = 10;

    //페이지의 갯수 : 1 ~ 10개 페이지
    var page_list_size = 10;

    //limit 변수
    var no = "";

    //전체 게시물의 숫자
    var totalPageCount = 0;

    //일단 쿼리로
    var queryString = 'select count(*) as cnt from review'
    getConnection().query(queryString, function (error2, data) {
        if (error2) {
            console.log(error2 + "메인 화면 mysql 조회 실패");
            return
        }
    

    //전체 게시물의 숫자
    totalPageCount = data[0].cnt
    //현제 페이지
    var curPage = req.params.cur;
    
    console.log("현재 페이지 : " + curPage, "전체 페이지 : " + totalPageCount);
    
    
        //전체 페이지 갯수
        if (totalPageCount < 0) {
            totalPageCount = 0
        }
    
    var totalPage = Math.ceil(totalPageCount / page_size);// 전체 페이지수
    var totalSet = Math.ceil(totalPage / page_list_size); //전체 세트수
    var curSet = Math.ceil(curPage / page_list_size) // 현재 셋트 번호
    var startPage = ((curSet - 1) * 10) + 1 //현재 세트내 출력될 시작 페이지
    var endPage = (startPage + page_list_size) - 1; //현재 세트내 출력될 마지막 페이지
    

    
        //현재페이지가 0 보다 작으면
        if (curPage < 0) {
            no = 0
        } else {
            //0보다 크면 limit 함수에 들어갈 첫번째 인자 값 구하기
            no = (curPage - 1) * 10
        }
    
    console.log('[0] curPage : ' + curPage + ' | [1] page_list_size : ' + page_list_size + ' | [2] page_size : ' + page_size + ' | [3] totalPage : ' + totalPage + ' | [4] totalSet : ' + totalSet + ' | [5] curSet : ' + curSet + ' | [6] startPage : ' + startPage + ' | [7] endPage : ' + endPage)
    
    var result2 = {
        "curPage": curPage,
        "page_list_size": page_list_size,
        "page_size": page_size,
        "totalPage": totalPage,
        "totalSet": totalSet,
        "curSet": curSet,
        "startPage": startPage,
        "endPage": endPage
    };
    
    
    fs.readFile('./views/list.ejs', 'utf-8', function (error, data) {
    
        if (error) {
                console.log("ejs오류" + error);
                return
            }
        console.log("몇번부터 몇번까지냐~~~~~~~" + no)
    
        //일단 쿼리로
        var queryString = 'select * from review order by review_id desc limit ?,?';
        getConnection().query(queryString, [no, page_size], function (error, result) {
        if (error) {
                console.log("페이징 에러" + error);
                return
            }
    
        res.send(ejs.render(data, {
                data: result,
                pasing: result2
            }));
        });

    });
    
    
    })
    
})


//메인 쇼 리뷰 화면
router.get('/showreview', function(req, res, next){
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
    res.redirect('/pasing/' + 1)
    //res.render('showreview', {isAuthenticated : isAuthenticated});
});


//메인 리뷰 화면
router.get('/review', function(req, res, next){
    console.log("메인 리뷰 화면")
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
    res.render('review', {isAuthenticated : isAuthenticated});
});
    
//삭제
router.get("/delete/:review_id", function (req, res) {
    console.log("삭제 진행")
    //일단 쿼리문
    getConnection().query('delete from review where review_id = ?', [req.params.id], function () {
        res.redirect('/review')
    });
})
    
//삽입 페이지
router.get("/insert", function (req, res) {
    console.log("삽입 페이지 나와라")  
    fs.readFile('./views/insert.ejs', 'utf-8', function (error, data) {
    res.send(data)
    })
    
})

//삽입 포스터 데이터
router.post("/insert", function (req, res) {
    console.log("삽입 포스트 데이터 진행")
    var review_id
    
    var queryString2 = 'select count(*) as cnt from review'
    getConnection().query(queryString2, function (error2, data) {
        if (error2) {
            console.log(error2 + "리뷰 아이디 수 mysql 조회 실패");
            return
        }
        review_id = data[0].cnt + 1
        console.log("review_id : "+review_id+"\n" )
        var body = req.body;
        // var review_id = body.review_id
        var user_id = body.user_id
        var grade = body.grade
        var contents = body.contents
        var univ_id = body.univ_id
        var depart_name = body.depart_name
        
        //쿼리문
        //var queryString = "insert into review (`review_id`, `user_id`, `grade`, `contents`, `univ_id`, `depart_name`) VALUES ("+review_id+",'"+user_id+"',"+grade+",'"+contents+"',"+univ_id+",'"+depart_name+"'"+")"
        /*console.log(queryString)
        getConnection().query(queryString, function () {
            //응답
            res.redirect('/review');
        })*/

        //ORM
        Review.create({ review_id : review_id, user_id : user_id, grade : grade, contents : contents, univ_id : univ_id, depart_name : depart_name})
            .then(result => {
                res.redirect('/review');
            })
            .catch(err => {
                console.error(err);
            })
    })
    /*var body = req.body;
    // var review_id = body.review_id
    var user_id = body.user_id
    var grade = body.grade
    var contents = body.contents
    var univ_id = body.univ_id
    var depart_name = body.depart_name
    var queryString = "insert into review (`review_id`, `user_id`, `grade`, `contents`, `univ_id`, `depart_name`) VALUES ("+review_id+",'"+user_id+"',"+grade+",'"+contents+"',"+univ_id+",'"+depart_name+"'"+")"
    console.log(queryString)
    getConnection().query(queryString, function () {
        //응답
        res.redirect('/review');
    })*/
})

//서치 페이지
router.get("/search", function (req, res, next) {
    console.log("서치 페이지 나와라")  
    fs.readFile('./views/search.ejs', 'utf-8', function (error, data) {
        res.send(data)
    })
    //res.redirect('/search/pasing/'+1)
    
})


//서치 데이터 대학교이름과 학과이름으로
router.post("/search", function (req, res) {
    console.log("서치 데이터 진행")

    //페이지당 게시물 수 : 한 페이지 당 30개 게시물
    var page_size = 30;

    //페이지의 갯수 : 1 ~ 10개 페이지
    var page_list_size = 10;

    //limit 변수
    var no = "";

    //전체 게시물의 숫자
    var totalPageCount = 0;

    //일단 쿼리로
    var body = req.body;
    //'insert into review(grade,contents,univ_id,depart_name) values (?,?,?,?)'

    // 'select count(review(univ_id,depart_name) values (?,?)) review(grade,contents,univ_id,depart_name) values (?,?,?,?)'
    var univ_id = body.univ_id
    var depart_name = body.depart_name
    var queryString = "select count(*) as cnt from review where univ_id = "+univ_id +" and depart_name = '"+depart_name+"'"
    console.log('\n1 쿼리 스트링 : '+queryString)
    getConnection().query(queryString, function (error2, data) {
        if (error2) {
            console.log(error2 + "검색 mysql 조회 실패");
            return
        }
    

    //전체 게시물의 숫자
    totalPageCount = data[0].cnt
    
    //현제 페이지
    // var curPage = req.params.cur;
    var curPage = 1; //hardcoidng//
    console.log("현재 페이지 : " + curPage, "전체 페이지 : " + totalPageCount);
    
    
        //전체 페이지 갯수
        if (totalPageCount < 0) {
            totalPageCount = 0
        }
    
    var totalPage = Math.ceil(totalPageCount / page_size);// 전체 페이지수
    var totalSet = Math.ceil(totalPage / page_list_size); //전체 세트수
    var curSet = Math.ceil(curPage / page_list_size) // 현재 셋트 번호
    var startPage = ((curSet - 1) * 10) + 1; //현재 세트내 출력될 시작 페이지
    var endPage = (startPage + page_list_size) - 1; //현재 세트내 출력될 마지막 페이지
    
    
        //현재페이지가 0 보다 작으면
        if (curPage < 0) {
            no = 0
        } else {
            //0보다 크면 limit 함수에 들어갈 첫번째 인자 값 구하기
            no = (curPage - 1) * 10
        }
    
    console.log('[0] curPage : ' + curPage + ' \n [1] page_list_size : ' + page_list_size + ' \n [2] page_size : ' + page_size + ' \n [3] totalPage : ' + totalPage + ' \n [4] totalSet : ' + totalSet + ' \n [5] curSet : ' + curSet + ' \n [6] startPage : ' + startPage + ' \n [7] endPage : ' + endPage)
    
    var result2 = {
        "curPage": curPage,
        "page_list_size": page_list_size,
        "page_size": page_size,
        "totalPage": totalPage,
        "totalSet": totalSet,
        "curSet": curSet,
        "startPage": startPage,
        "endPage": endPage
    };
    
    fs.readFile('./views/searchlist.ejs', 'utf-8', function (error, data) {
    
        if (error) {
                console.log("ejs오류" + error);
                return
            }
        console.log("몇번부터 몇번까지냐~~~~~~~" + no)
    
        //select count(*) as cnt from review where univ_id = ? and depart_name = ?
        //일단 쿼리로
        var queryString = "select * from review where univ_id = "+univ_id+ " and depart_name = '" +depart_name+ "' order by review_id";
        console.log('\n2 쿼리 스트링 : '+queryString)
        getConnection().query(queryString, [no, page_size], function (error, result) {
        if (error) {
                console.log("페이징 에러" + error);
                return
            }
    

        console.log("\nresult : "+result);
        console.log("\nresult2 : "+result2);
        res.send(ejs.render(data, {
                data: result,
                pasing: result2
            }));
        });
    });
    
    
    })
})
    



    
//글상세보기
router.get("/detail/:review_id", function (req, res) {
    console.log("디테일 진행")
    fs.readFile('./views/detail.ejs', 'utf-8', function (error, data) {
        //일단 쿼리
        /*getConnection().query('select * from review where user_id = ?', [req.params.user_id], function (error, result) {
        res.send(ejs.render(data, {
            data: result[0]
            }))
        })*/
        //orm
        Review.findAll({
            where: {
                review_id : req.params.review_id
            }
        })
            .then(result => {
                res.send(ejs.render(data, {
                    data: result[0]
                }))
            })
            .catch(err => {
                console.error(err);
            })

    });
})
    
/*
router.get('/writereview', function(req, res, next){
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
    res.render('writereview', {isAuthenticated : isAuthenticated});
});
*/

//mysql db 연결 함수

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    database: 'db_project',
    password: '1234'
})
    
    
    
//디비 연결 함수
function getConnection() {
    return pool
}
    


module.exports = router;