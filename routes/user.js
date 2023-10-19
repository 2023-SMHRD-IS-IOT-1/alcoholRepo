const express = require('express');
const router = express.Router();
const conn = require("../config/database");

// 회원가입 기능
router.post('/getData', (req, res)=>{
    console.log('get data', req.body);
    let email = req.body[0];
    let password = req.body[1];
    let confirmPassword = req.body[2];
    let name = req.body[3];
    let phoneNumber = req.body[4];
    let birthYear = parseInt(req.body[5]);
    let gender = req.body[6];
    let nickname = req.body[7];
    let joindate = "2023-10-11 14:53:01"
    // let { email, password, name, phoneNumber, birthYear, gender, nickname, joindate} = req.body;
    console.log(phoneNumber);
    console.log(birthYear);

    let sql = "insert into users (u_email, u_pw, u_name, u_phone, u_birthyear, u_gender, u_nickname) "
            +"values (?, ?, ?, ?, ?, ?, ?)"

    conn.query(sql, [email, password, name, phoneNumber, birthYear, gender, nickname, joindate], (err, rows) => {
        console.log('회원가입 결과', rows)
        if (rows) {
          console.log('회원가입 성공');
          res.json({ exists: true });
        } else {
          console.log('회원가입 실패');
          res.json({ exists: false });
        }
    });

})

// 이메일 중복확인
router.post('/checkemail', (req, res)=>{
    console.log('get data', req.body);
    let email = req.body[0];
    console.log(email);
  
    let sql ="select u_email from users where u_email = ?"
    conn.query(sql, [email], (err, rows)=>{
      console.log('이메일 중복 결과', rows)
      if (rows.length > 0) {
        console.log('중복된 이메일이 존재합니다.');
        res.json({ exists: true });
      } else {
        console.log('사용가능한 이메일입니다.');
        res.json({ exists: false });
      }
    })
  })

// 로그인 기능
  router.post('/getLogin', (req, res)=>{
    console.log('get data', req.body);
    let email = req.body[0];
    let password = req.body[1];
  
    let sql = "select u_email, u_nickname from users where u_email = ? and u_pw = ?"
  
    conn.query(sql, [email, password], (err, rows)=> {
      console.log('로그인 결과', rows)
      if (rows.length > 0) {
        console.log('로그인 성공',rows[0].u_nickname)
        req.session.user = [email = rows[0].u_email, nickname = rows[0].u_nickname]
        console.log(req.session.user);
        req.session.save(() => {
            res.json({ exists: true});
        })
      } else {
        console.log('로그인 실패')
        res.json({ exists: false });
      }
    })
  })
  
//   로그아웃 기능
  router.get("/logout", (req, res) => {
    req.session.user = "";
    req.session.save(() => {
      res.json({ exists : true})
    })
  });
  

// 회원정보 수정
  router.post('/getUpdate',(req, res) => {
    let email = req.body[0];
    let password = req.body[1];
    let confirmPassword = req.body[2];
    let name = req.body[3];
    let phoneNumber = req.body[4];
    let birthYear = parseInt(req.body[5]);
    let gender = req.body[6];
    let nickname = req.body[7];
    // let { email, password, name, phoneNumber, birthYear, gender, nickname, joindate} = req.body;
    console.log(phoneNumber);
    console.log(birthYear);

    let sql = "update users set u_pw =?, u_name = ?, u_phone = ?, u_birthyear = ?, u_gender = ?, u_nickname = ?"
            + "WHERE  u_email = ?"

    conn.query(sql, [password, name, phoneNumber, birthYear, gender, nickname, email], (err, rows) => {
        console.log('회원정보수정 결과', rows)
        if (rows) {
          console.log('수정 성공');
          res.json({ exists: true });
        } else {
          console.log('수정 실패');
          res.json({ exists: false });
        }
    });
  })


  router.get('/getA',(req, res) => {
    console.log("getA");
    let sql = "SELECT * FROM alcohol WHERE DATE(starttime) BETWEEN DATE_SUB(CURDATE(), INTERVAL 6 DAY) AND CURDATE();";
    conn.query(sql, (err, rows) => {
      console.log(rows);
      res.json({data : rows})
    })
  })


  module.exports = router;