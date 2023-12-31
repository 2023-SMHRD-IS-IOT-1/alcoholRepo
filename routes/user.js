const express = require('express');
const router = express.Router();
const conn = require("../config/database");

// 회원가입 기능
router.post('/getData', (req, res) => {
  console.log('get data', req.body);
  let email = req.body[0];
  let password = req.body[1];
  let confirmPassword = req.body[2];
  let name = req.body[3];
  let phoneNumber = req.body[4];
  let birthYear = req.body[5];
  let gender = req.body[6];
  let nickname = req.body[7];
  let maxalcohol = req.body[8];
  let maxtime = req.body[9];
  let img = req.body[10];
  // let { email, password, name, phoneNumber, birthYear, gender, nickname, joindate} = req.body;
  console.log(phoneNumber);
  console.log(birthYear);

  let sql = "insert into users (u_email, u_pw, u_name, u_phone, u_birthyear, u_gender, u_nickname, u_maxalcohol, u_maxtime, u_img) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

  conn.query(sql, [email, password, name, phoneNumber, birthYear, gender, nickname, maxalcohol, maxtime, img], (err, rows) => {
    console.log('회원가입 결과', rows)
    if (rows) {
      console.log('회원가입 성공');
      res.json({ exists: true });
    } else {
      console.log('회원가입 실패');
      // res.json({ exists: false });
    }
  });

})

// 이메일 중복확인
router.post('/checkemail', (req, res) => {
  console.log('get data', req.body);
  let email = req.body[0];
  console.log(email);

  let sql = "select u_email from users where u_email = ?"
  conn.query(sql, [email], (err, rows) => {
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

// 닉네임 중복확인
router.post('/checknickname', (req, res) => {
  console.log('get data', req.body);
  let nickname = req.body[0];
  console.log(nickname);

  let sql = "select u_nickname from users where u_nickname = ?"
  conn.query(sql, [nickname], (err, rows) => {
    console.log('닉네임 중복 결과', rows)
    if (rows.length > 0) {
      console.log('중복된 닉네임이 존재합니다.');
      res.json({ exists: true });
    } else {
      console.log('사용가능한 닉네임입니다.');
      res.json({ exists: false });
    }
  })
})

// 로그인 기능
router.post('/getLogin', (req, res) => {
  console.log('get data', req.body);
  let email = req.body[0];
  let password = req.body[1];

  let sql = "select * from users where u_email = ? and u_pw = ?"
  let sql2 = "insert into session values ( ? );"

  conn.query(sql, [email, password], (err, rows) => {
    console.log('로그인 결과', rows)
    if (rows.length > 0) {
      console.log('로그인 성공');
      // req.session.user = [email = rows[0].u_email, nickname = rows[0].u_nickname]
      // console.log(req.session.user);
      // req.session.save(() => {
      //     res.json({ exists: true});
      // })
      conn.query(sql2, [email], (err, rows) => {
        console.log('DB저장 성공')
      })
      res.json({ data : rows });
    } else {
      console.log('로그인 실패')
      res.json({ data : rows });
    }
  })
})

//   로그아웃 기능
router.get("/logout", (req, res) => {
  req.session.user = "";
  req.session.save(() => {
    res.json({ exists: true })
  })
});


// 회원정보 수정
router.post('/getUpdate', (req, res) => {
  let email = req.body[0];
  let password = req.body[1];
  let name = req.body[2];
  let phoneNumber = req.body[3];
  let birthYear = parseInt(req.body[4]);
  let gender = req.body[5];
  let nickname = req.body[6];
  let goal = req.body[7];
  let time = req.body[8];
  let img = req.body[9];

  console.log(img);
  // let { email, password, name, phoneNumber, birthYear, gender, nickname, joindate} = req.body;

  let sql = "update users set u_pw =?, u_name = ?, u_phone = ?, u_birthyear = ?, u_gender = ?, u_nickname = ?, u_maxalcohol = ?, u_maxtime = ?, u_img = ? WHERE u_email = ?"

  conn.query(sql, [password, name, phoneNumber, birthYear, gender, nickname, goal, time, img, email], (err, rows) => {
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


// PW 변경
router.post('/ChangePW', (req, res) => {
  console.log('ChangePW', req.body);
  let email = req.body[0];
  let pw = req.body[1];


  let sql = "update users set u_pw = ? where u_email = ?"

  conn.query(sql, [pw, email], (err, rows) => {
    console.log('PW변경 결과', rows)
    if (rows) {
      console.log('PW변경 성공')
      res.json({ exists: true })
    } else {
      console.log('PW변경 실패')
      res.json({ exists: false });
    }
  })
})

// ID 찾기
router.post('/FindID', (req, res) => {
  console.log('FindID', req.body);
  let name = req.body[0];
  let phoneNumber = req.body[1];

  let sql = "select u_email from users where u_name = ? and u_phone = ?"

  conn.query(sql, [name, phoneNumber], (err, rows) => {
    console.log('ID찾기 결과', rows)
    if (rows.length) {
      console.log('ID찾기 성공')
      res.json({ data: rows })
    } else {
      console.log('ID찾기 실패')
    }
  })
})

// PW 찾기
router.post('/FindPW', (req, res) => {
  console.log('FindPW', req.body);
  let email = req.body[0];
  let name = req.body[1];
  let phoneNumber = req.body[2];


  let sql = "select u_pw from users where u_email = ? and u_name = ? and u_phone = ?"

  conn.query(sql, [email, name, phoneNumber], (err, rows) => {
    console.log('PW찾기 결과', rows)
    if (rows.length) {
      console.log('pW찾기 성공')
      res.json({ data: rows })
    } else {
      console.log('PW찾기 실패')
    }
  })
})

// PW 변경
router.post('/ChangePW', (req, res) => {
  console.log('ChangePW', req.body);
  let email = req.body[0];
  let pw = req.body[1];


  let sql = "update users set u_pw = ? where u_email = ?"

  conn.query(sql, [pw, email], (err, rows) => {
    console.log('PW변경 결과', rows)
    if (rows) {
      console.log('PW변경 성공')
      res.json({ exists: true })
    } else {
      console.log('PW변경 실패')
    }
  })
})

// 유저 알코올 데이터
router.get('/getAlcoholData', (req, res) => {
  console.log("getAlcoholData");
  let sql = "SELECT * FROM alcohol WHERE DATE(start_time) BETWEEN DATE_SUB(CURDATE(), INTERVAL 29 DAY) AND CURDATE()";

  conn.query(sql, (err, rows) => {
    console.log("데이터 수신 결과", rows);
    if (rows) {
      console.log('데이터 수신 성공');
      res.json({ data: rows });
    } else {
      console.log('데이터 수신 실패');
    }

  })
})


module.exports = router;