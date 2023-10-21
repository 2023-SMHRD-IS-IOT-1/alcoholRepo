import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";

function createData(name, trackingId, date, status, detail) {
  return { name, trackingId, date, status, detail };
}

const rows = [
  createData("음주량", 18908424, "2 March 2022", "양호", "야호"),
  createData("음주시간", 18908424, "2 March 2022", "경고"),
  createData("음주속도", 18908421, "2 March 2022", "주의"),
];


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
  return (
    <div className="Table">
      <br />
      <br />
      <h1>User 분석</h1>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width="80px">분석명</TableCell>
              <TableCell width="160px" align="left">시작 날짜</TableCell>
              <TableCell width="160px" align="left">끝 날짜</TableCell>
              <TableCell width="80px" align="left">상태</TableCell>
              <TableCell align="left">분석</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.trackingId}</TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left">
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
