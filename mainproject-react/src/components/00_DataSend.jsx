import React, { useState } from 'react'
import axios from  '../axios'

const Test = () => {
  // 6-3. 전송 데이터 state 생성
  const [data, setData] = useState();

  // 6-1. 폼 제출 시 실행 함수
  const sendData = (e)=>{
    // 6-2. 폼 전송 이벤트 방지
    e.preventDefault();
    console.log('function sendData', data);

    // 7-2. axios를 통한 데이터 전송
    axios
    .post('/getData', {data : data})
    .then(res=>console.log(res.data))
  }
  return (
    <div>
      <form onSubmit={sendData}>
        <h1>React-Node Link</h1>
        <input type="text"
        // 6-4. 입력값 data에 세팅
        onChange={e=>setData(e.target.value)} />
        <input type="submit" value="Send Data"/>
      </form>
    </div>
  )
}

export default Test