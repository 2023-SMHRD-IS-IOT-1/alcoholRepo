import React, { useEffect, useState } from 'react';
import './Forgot.css'
import axios from '../../axios';
import ForgotEmail from './ForgotEmail';
import ForgotPW from './ForgotPW';

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



  const [showModalPW, setShowModalPW] = useState(false);



  const [messageID, setMessageID] = useState('');
  const [messagePW, setMessagePW] = useState('');



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
        setModalContentID(response.data.data[0].u_email); // 모달 내용 설정
        setShowModalID(true);
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



  // Email 찾기 모달창 오픈!

  const openEmaiModal = () => {
    setShowModalID(true);
  }
  const closeEmailModal = () => {
    setShowModalID(false);
  }

  const openPWModal = () => {
    setShowModalPW(true);
  }
  const closePWModal = () => {
    setShowModalPW(false);
  }



  // const closeModal = () => {
  //   setShowModalID(false);
  //   setModalContentID('');
  //   setShowModalPW(false);
  // }



  return (
    <StyledDiv style={{
      display: 'block',
      alignItems: 'center',
    }}>
      <StyledH1>이메일 / 비밀번호 찾기 페이지</StyledH1>
      <StyledDiv className='idpwdiv'>
      <StyledH3>이메일 찾기</StyledH3>
      {showModalID && (<ForgotEmail modalContentID={modalContentID} isOpen={showModalID} onClose={closeEmailModal} />)}
        <StyledForm onSubmit={handleFindID}>
          
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
          <StyledButton type="submit">Email 찾기</StyledButton>

        </StyledForm>

      </StyledDiv>

      {/* {showModalPW && (
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
      )} */}
      <StyledDiv className='idpwdiv'>
      <StyledH3>비밀번호 찾기</StyledH3>
      {showModalPW && (<ForgotPW email={email} isOpen={showModalPW} onClose={closePWModal} />)}
        <StyledForm onSubmit={handleFindPW}>
          
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
          <StyledButton type="submit">PW 찾기</StyledButton>
        </StyledForm>
        
      </StyledDiv>
    </StyledDiv>
  );
};

export default Forgot