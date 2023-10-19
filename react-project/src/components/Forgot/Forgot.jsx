import React, { useEffect, useState } from 'react';
import './Forgot.css'
import axios from '../../axios';

import {
  StyledDiv, StyledH1, StyledForm, StyledH3, StyledLabel,
  StyledInput, StyledButton, StyledSpan, StyledP
} from '../Style'


const Forgot = () => {
  const [email, setEmail] = useState('');
  const [nameID, setNameID] = useState('');
  const [phoneNumberID, setPhoneNumberID] = useState('');
  const [namePW, setNamePW] = useState('');
  const [phoneNumberPW, setPhoneNumberPW] = useState('');

  const [showModalID, setShowModalID] = useState(false); // 모달 표시 여부 상태 변수
  const [modalContentID, setModalContentID] = useState(''); // 모달 내용 상태 변수

  const [changePW, setChangePW] = useState('');
  const [changePWCheck, setChangePWCheck] = useState('');

  const [showModalPW, setShowModalPW] = useState(false);

  const [isPasswordMatching, setIsPasswordMatching] = useState(true);

  const [messageID, setMessageID] = useState('');
  const [messagePW, setMessagePW] = useState('');
  // (2) pw, confirmpw 값이 변경될 때마다 일치 여부 확인 및 업데이트
  useEffect(() => {
    if (changePW && changePWCheck) {
      setIsPasswordMatching(changePW === changePWCheck);
    }
  }, [changePW, changePWCheck]);


  // email 유효성 확인
  const [isValidEmail, setIsValidEmail] = useState(true);

  useEffect(() => {
    // email 유효성 검사
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    setIsValidEmail(emailPattern.test(email));
  }, [email]);

  const handleFindID = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/FindID', [nameID, phoneNumberID]);
      if (response.data.data.length) {
        console.log("ID 찾기 성공");
        console.log("보여줌", response.data);
        console.log("받는 데이터", response.data.data[0].u_email);
        setShowModalID(true);
        setModalContentID(response.data.data[0].u_email); // 모달 내용 설정
        setMessageID('');
      } else {
        console.log("ID 찾기 실패");
        setMessageID('입력한 정보를 다시 확인해주세요.');
      }
    } catch (err) {
      // setMessage('에러가 발생했습니다. 다시 시도하세요.');
    }
  }

  const handleFindPW = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/FindPW', [email, namePW, phoneNumberPW]);
      if (response.data.data.length) {
        console.log("PW 찾기 성공");
        console.log("받는 데이터");
        setShowModalPW(true);
        setMessagePW('');
      } else {
        console.log("PW 찾기 실패");
        setMessagePW('입력한 정보를 다시 확인해주세요.');
      }
    } catch (err) {
      // setMessage('에러가 발생했습니다. 다시 시도하세요.');
    }
  }

  const handleChangePW = async (e) => {
    e.preventDefault();
    console.log("PW 변경 시도");
    try {
      const response = await axios.post('/user/ChangePW', [email, changePW, changePWCheck]);
      if (response.data.exists) {
        console.log("PW 변경 성공");
        setShowModalPW(false);
        console.log("받는 데이터", response.data.data[0].u_pw);
        // history.back();
      } else {
        console.log("PW 변경 실패");
      }
    } catch (err) {
      // setMessage('에러가 발생했습니다. 다시 시도하세요.');
    }
  }



  const closeModal = () => {
    setShowModalID(false);
    setModalContentID('');
    setShowModalPW(false);
  }



  return (
    <StyledDiv>
      <StyledH1>이메일 / 비밀번호 찾기 페이지</StyledH1>
      {showModalID && (
        <form className='modalIDform'>
          <div className="modalID">
            <div className="modalID-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <StyledLabel>찾은 이메일: {modalContentID}</StyledLabel>
            </div>
          </div>
        </form>
      )}
      <StyledForm onSubmit={handleFindID}>
        <StyledH3>이메일 찾기</StyledH3>
        <StyledDiv>
          <StyledLabel>Name: </StyledLabel>
          <StyledInput
            type="text"
            value={nameID}
            onChange={(e) => setNameID(e.target.value)}
            placeholder='홍길동'
          />
        </StyledDiv>
        <StyledDiv>
          <StyledLabel>Phone Number: </StyledLabel>
          <StyledInput
            type="number"
            value={phoneNumberID}
            onChange={(e) => setPhoneNumberID(e.target.value)}
            placeholder='01012341234'
          />
        </StyledDiv>
        <StyledP>{messageID}</StyledP>
        <StyledButton type="submit">Email 찾기 확인</StyledButton>
      </StyledForm>
      {showModalPW && (
        <form className='modalPWform' onSubmit={handleChangePW}>
          <div className="modalPW">
            <div className="modalPW-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <StyledLabel>새 비밀번호:</StyledLabel>
              <StyledInput
                type='password'
                value={changePW}
                onChange={(e) => setChangePW(e.target.value)}
                placeholder='********'
              />
              <StyledLabel>새 비밀번호 확인:</StyledLabel>
              <StyledInput
                type='password'
                value={changePWCheck}
                onChange={(e) => setChangePWCheck(e.target.value)}
                placeholder='********'
              />
              <br />
              {changePW && changePWCheck && (
                <StyledSpan style={{ color: isPasswordMatching ? 'green' : 'red' }}>
                  {isPasswordMatching ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
                </StyledSpan>
              )}
              <br />
              <StyledButton type="submit">PW 변경</StyledButton>
            </div>
          </div>
        </form>
      )}
      <StyledForm onSubmit={handleFindPW}>

        <StyledH3>비밀번호 찾기</StyledH3>
        <StyledDiv>
          <StyledLabel>Email: </StyledLabel>
          <StyledInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='이메일을 입력하세요'
          />
          <br />
          {/* 조건부 렌더링 */}
          {email && !isValidEmail && (
            <StyledSpan style={{ color: 'red' }}>
              이메일 형식이 올바르지 않습니다.
            </StyledSpan>
          )}
        </StyledDiv>
        <StyledDiv>
          <StyledLabel>Name: </StyledLabel>
          <StyledInput
            type="text"
            value={namePW}
            onChange={(e) => setNamePW(e.target.value)}
            placeholder='홍길동'
          />
        </StyledDiv>
        <StyledDiv>
          <StyledLabel>Phone Number: </StyledLabel>
          <StyledInput
            type="number"
            value={phoneNumberPW}
            onChange={(e) => setPhoneNumberPW(e.target.value)}
            placeholder='01012341234'
          />
        </StyledDiv>
        <StyledP>{messagePW}</StyledP>
        <StyledButton type="submit">PW 찾기 확인</StyledButton>
      </StyledForm>
    </StyledDiv>
  );
};

export default Forgot