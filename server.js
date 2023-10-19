/* 
10.12 16:36 이건중 app.use에 경로 * 추가
*/

// 2-1. 기본 설치 모듈 가져오기
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const fileStore = require('session-file-store')(session);

// 5-1. 리액트 프로젝트 경로 설정
const path = require('path');
app.use(express.static(path.join(__dirname, 'react-project', 'build')));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended : true }));

// 세션
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : "secret",
    store : new fileStore()
}))

// 8. cors 모듈 가져오기
const cors = require('cors');
app.use(cors()); // 미들웨어 등록

// 3-4. 메인페이지 경로 설정 - 이게 아래로 와야해!
const indexRouter = require('./routes/index')// /index는 생략해도된다.
app.use('/', indexRouter);

// 유저의 기능들을 모은 페이지 경로
const userRouter = require('./routes/user');
app.use('/user', userRouter);

// 아두이노에서 받아올 데이터커넥트 경로
const connectRouter = require('./routes/connect');
app.use('/connect', connectRouter)
app.use('*', (req, res)=>{
    res.sendFile(path.join(__dirname,  'react-project', 'build', 'index.html'));
});


// 2-2. 포트 설정
app.set('PORT', process.env.PORT || 5000);
app.listen(app.get('PORT'), ()=>{
    console.log('Server is running on 5000..');
})

