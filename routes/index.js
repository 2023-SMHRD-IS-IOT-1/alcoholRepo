// 3-1. 라우터 모듈 가져오기
const express = require('express');
const router = express.Router();

const conn = require("../config/database");
// 5-2. 에서 path모듈 가져오기 - 이거없어도된대
// const path = require('path');

// 3-3. 메인페이지 경로 설정
router.get('/', (req, res)=>{
    console.log('main');
    // 5-2. 리액트 프로젝트 경로 설정
    res.sendFile(path.join(__dirname, 'react-project', 'build', 'index.html'))
    res.render("C_MyPage", {obj : req.session.user })
})

// 회원가입페이지 경로 설정
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'react-project', 'build', 'index.html'));
})


// 3-2. 라우터 모듈 내보내기
module.exports = router;