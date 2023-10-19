// 4-1. mysql 모듈 가져오기
const mysql = require('mysql2');

// 4-2. DB 정보 저장
let conn = mysql.createConnection({
     'host' : 'project-db-campus.smhrd.com',
     'user' : 'campus_23IS_IoT1_hack_4',
     'password' : 'smhrd4',
      port : 3307,
      'database' : 'campus_23IS_IoT1_hack_4'
});

// 4-3. DB 정보 연결 및 모듈 내보내기
conn.connect();
module.exports = conn;
