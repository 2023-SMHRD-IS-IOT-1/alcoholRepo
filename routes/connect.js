const express = require('express');
const router = express.Router();
const conn = require('../config/database')

router.post('/update_weight', (req, res)=>{
    console.log('update weight router')
    console.log('get data', req.body);
    let soju_b = parseFloat(req.body.weight);
    // let write_date = ""
    let sagi = "admin@naver.com"
    
    let sql_s = "select * from alcohol where u_email = ? and start_time > DATE(CURDATE()) and start_time < DATE_ADD(CURDATE(), INTERVAL 1 DAY);"

    conn.query(sql_s, [sagi], (err, rows) => {
        console.log('셀렉트문 :', rows);
        let soju_g = 0;

        if (rows.length){
            console.log(soju_b);
            // console.log(soju_g);
            soju_g = rows[0].soju_ml;
            soju_g += soju_b;
            let sql_u = "update alcohol set soju_ml = ? where u_email = ? and DATE(start_time) = CURDATE()"
            conn.query(sql_u, [soju_g, sagi], (err, rows) => {
                console.log('업데이트문 :', rows);
                if (rows) {
                    console.log('업데이트 성공');
                } else {
                    console.log('업데이트 실패');
                }
            })
        } else {
            soju_g = req.body.weight;
            console.log(soju_g);
            let sql_i = "insert into alcohol (u_email, soju_ml, beer_ml, start_time, end_time) values ( ?, ?, ?, NOW(), NOW() )"
            conn.query(sql_i, [sagi, soju_g, 0], (err, rows) => {
                console.log('인서트문 :', rows);
            })
        }
    })
})



module.exports = router;