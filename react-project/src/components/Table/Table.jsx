import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { Userinfo, CardsData } from '../../data/Data'

function createData(name, trackingId, date, status, detail) {
  return { name, trackingId, date, status, detail };
}




const makeStyle = (status) => {
  if (status === '양호') {
    return {
      background: '#43aa8b',
      color: 'white',
      fontWeight: 'bold',
    }
  }
  else if (status === '주의') {
    return {
      background: '#f9c74f',
      color: 'white',
      fontWeight: 'bold',
    }
  }
  else if (status === '경고') {
    return {
      background: '#f94144',
      color: 'white',
      fontWeight: 'bold',
    }
  }
  else {
    return {
      background: '#59bfff',
      color: 'white',
    }
  }
}

export default function BasicTable() {

  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  const endday = year + '-' + month + '-' + date;

  let todayago = new Date(today);
  todayago.setDate(today.getDate() - 6);
  year = todayago.getFullYear();
  month = todayago.getMonth() + 1;
  date = todayago.getDate();
  const startday = year + '-' + month + '-' + date;

  console.log(endday);
  console.log(startday);

  let drink;
  let drinkdetail = (
    <span>
      <span style={{ color: 'blue', fontWeight: 'bold' }}>일주일</span>간 마신 음주량은
      <span style={{ color: 'red', fontWeight: 'bold' }}> {CardsData[0].value}</span> 입니다.
      <span style={{ color: 'blue', fontWeight: 'bold' }}> 일주일</span> 설정 음주량
      <span style={{ color: 'red', fontWeight: 'bold' }}> {Math.ceil(Userinfo[0].u_maxalcohol / 360 * 100) / 100}병</span> 에 비해
    </span>
  );
  let drinkdetailadd
  let drinktime;
  let drinktimedetail = (
    <span>
      <span style={{ color: 'blue', fontWeight: 'bold' }}>일주일</span>간 마신 음주시간은
      <span style={{ color: 'red', fontWeight: 'bold' }}> {Math.ceil(CardsData[1].value.replace('h', '') * 100) / 100}h</span> 입니다.
      <span style={{ color: 'blue', fontWeight: 'bold' }}> 일주일</span> 설정 음주시간
      <span style={{ color: 'red', fontWeight: 'bold' }}> {Math.ceil(Userinfo[0].u_maxtime / 60 * 100) / 100}h</span> 에 비해
    </span>
  );
  let drinktimedetailadd
  let drinkspeed;
  let drinkspeeddetail = (
    <span>
      <span style={{ color: 'blue', fontWeight: 'bold' }}>일주일</span>간 마신 하루 평균 음주속도는
      <span style={{ color: 'red', fontWeight: 'bold' }}> {CardsData[2].value}</span> 입니다.
      <span style={{ color: 'blue', fontWeight: 'bold' }}> 일주일</span> 설정 평균 음주속도
      <span style={{ color: 'red', fontWeight: 'bold' }}> {Math.ceil((Userinfo[0].u_maxalcohol) / (Userinfo[0].u_maxtime / 60) * 100) / 100}ml/h</span> 에 비해
    </span>
  );
  let drinkspeeddetailadd

  console.log("드링크디테일", drinkdetail);

  if (CardsData[0].barValue <= 80) {
    drink = "양호"
    drinkdetailadd = (
      <span>
        <span style={{ color: '#43aa8b', fontWeight: 'bold' }}> {Math.ceil(CardsData[0].barValue * 100) / 100}%</span>로
        설정 음주량의 <span style={{ color: '#43aa8b', fontWeight: 'bold' }}> 80% 이하</span> 입니다.
        <br />
        <span style={{ color: '#43aa8b', fontWeight: 'bold', fontSize: '15px' }}> 양호합니다.</span>
      </span>
    )
  } else if (CardsData[0].barValue < 100) {
    drink = "주의"
    drinkdetailadd = (
      <span>
        <span style={{ color: '#f9c74f', fontWeight: 'bold' }}> {Math.ceil(CardsData[0].barValue * 100) / 100}%</span>로
        설정 음주량의 <span style={{ color: '#f9c74f', fontWeight: 'bold' }}> 80% 이상</span> 입니다.
        <br />
        <span style={{ color: '#f9c74f', fontWeight: 'bold', fontSize: '15px' }}> 주의가 필요합니다.</span>
      </span>
    )
  } else {
    drink = "경고"
    drinkdetailadd = (
      <span>
        <span style={{ color: '#f94144', fontWeight: 'bold' }}> {Math.ceil(CardsData[0].barValue * 100) / 100}%</span>로
        설정 음주량의 <span style={{ color: '#f94144', fontWeight: 'bold' }}> 100% 이상</span> 입니다.
        <br />
        <span style={{ color: '#f94144', fontWeight: 'bold', fontSize: '15px' }}> 음주량 관리가 필요합니다.</span>
      </span>
    )
  }
  drinkdetail = (
    <div>
      {drinkdetail} {drinkdetailadd}
    </div>
  )

  if (CardsData[1].barValue <= 80) {
    drinktime = "양호"
    drinktimedetailadd = (
      <span>
        <span style={{ color: '#43aa8b', fontWeight: 'bold' }}> {Math.ceil(CardsData[1].barValue * 100) / 100}%</span>로
        설정 음주시간의 <span style={{ color: '#43aa8b', fontWeight: 'bold' }}> 80% 이하</span> 입니다.
        <br />
        <span style={{ color: '#43aa8b', fontWeight: 'bold', fontSize: '15px' }}> 양호합니다.</span>
      </span>
    )
  } else if (CardsData[1].barValue < 100) {
    drinktime = "주의"
    drinktimedetailadd = (
      <span>
        <span style={{ color: '#f9c74f', fontWeight: 'bold' }}> {Math.ceil(CardsData[1].barValue * 100) / 100}%</span>로
        설정 음주시간의 <span style={{ color: '#f9c74f', fontWeight: 'bold' }}> 80% 이상</span> 입니다.
        <br />
        <span style={{ color: '#f9c74f', fontWeight: 'bold', fontSize: '15px' }}> 주의가 필요합니다.</span>
      </span>
    )
  } else {
    drinktime = "경고"
    drinktimedetailadd = (
      <span>
        <span style={{ color: '#f94144', fontWeight: 'bold' }}> {Math.ceil(CardsData[1].barValue * 100) / 100}%</span>로
        설정 음주시간의 <span style={{ color: '#f94144', fontWeight: 'bold' }}> 100% 이상</span> 입니다.
        <br />
        <span style={{ color: '#f94144', fontWeight: 'bold', fontSize: '15px' }}> 음주시간 관리가 필요합니다.</span>
      </span>
    )
  }
  drinktimedetail = (
    <div>
      {drinktimedetail} {drinktimedetailadd}
    </div>
  )

  if (CardsData[2].barValue <= 80) {
    drinkspeed = "양호"
    drinkspeeddetailadd = (
      <span>
        <span style={{ color: '#43aa8b', fontWeight: 'bold' }}> {Math.ceil(CardsData[2].barValue * 100) / 100}%</span>로
        설정 음주속도의 <span style={{ color: '#43aa8b', fontWeight: 'bold' }}> 80% 이하</span> 입니다.
        <br />
        <span style={{ color: '#43aa8b', fontWeight: 'bold', fontSize: '15px' }}> 양호합니다.</span>
      </span>
    )
  } else if (CardsData[2].barValue < 100) {
    drinkspeed = "주의"
    drinkspeeddetailadd = (
      <span>
        <span style={{ color: '#f9c74f', fontWeight: 'bold' }}> {Math.ceil(CardsData[2].barValue * 100) / 100}%</span>로
        설정 음주속도의 <span style={{ color: '#f9c74f', fontWeight: 'bold' }}> 80% 이상</span> 입니다.
        <br />
        <span style={{ color: '#f9c74f', fontWeight: 'bold', fontSize: '15px' }}> 주의가 필요합니다.</span>
      </span>
    )
  } else {
    drinkspeed = "경고"
    drinkspeeddetailadd = (
      <span>
        <span style={{ color: '#f94144', fontWeight: 'bold' }}> {Math.ceil(CardsData[2].barValue * 100) / 100}%</span>로
        설정 음주속도의 <span style={{ color: '#f94144', fontWeight: 'bold' }}> 100% 이상</span> 입니다.
        <br />
        <span style={{ color: '#f94144', fontWeight: 'bold', fontSize: '15px' }}> 천천히 마실 필요가 있습니다.</span>
      </span>
    )
  }
  drinkspeeddetail = (
    <div>
      {drinkspeeddetail} {drinkspeeddetailadd}
    </div>
  )

  const rows = [
    createData("음주량", startday, endday, drink, drinkdetail),
    createData("음주시간", startday, endday, drinktime, drinktimedetail),
    createData("음주속도", startday, endday, drinkspeed, drinkspeeddetail),
  ];
  return (
    <div className="Table">
      <br />
      <h3>7days User Analyze</h3>
      <TableContainer
        component={Paper}
        style={{
          boxShadow: "0px 13px 20px 0px #80808029",
          backgroundColor: "#fff0f3"
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width="80px" align="center">분석명</TableCell>
              <TableCell width="80px" align="center">분석 시작일</TableCell>
              <TableCell width="80px" align="center">분석 종료일</TableCell>
              <TableCell width="80px" align="center">상태</TableCell>
              <TableCell align="center">분석</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.trackingId}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">
                  <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                </TableCell>
                <TableCell align="left" className="Details">{row.detail}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
