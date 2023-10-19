const express = require('express');
const router = express.Router();
const conn = require('../config/database')

// router.post('/update_weight', (req, res)=>{
//     console.log('update weight router')
//     console.log('get data', req.body);
//     let al_g = req.body.weight
//     // let write_date = ""
//     let sql = "select * from alcohol2 order by weight desc LIMIT 1";
//     conn.query(sql, (err, rows) => {
//         console.log('데이터 받기 결과', rows)
//         if (rows) {
//             console.log(rows[0].weight);
//         } else {
//           console.log('데이터 받기 실패');
//         }
//     });
//     sql = "insert into alcohol2 values (?)"
    
//     conn.query(sql, [al_g], (err, rows) => {
//         console.log('데이터 전송 결과', rows)
//         if (rows) {
//           console.log('데이터 전송 성공');
          
//         } else {
//           console.log('데이터 전송 실패');
          
//         }
//     });
// })

module.exports = router;