import React, { useEffect, useState } from 'react';
import './SignUp.css'
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';

import {
  StyledDiv, StyledH1, StyledForm, StyledLabel,
  StyledInput, StyledButton, StyledSpan, StyledP
} from '../Style'


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthYear, setBirthYear] = useState('선택');
  const [gender, setGender] = useState('선택');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  // email 유효성 확인
  const [isValidEmail, setIsValidEmail] = useState(true);

  useEffect(() => {
    // email 유효성 검사
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    setIsValidEmail(emailPattern.test(email));
  }, [email]);

  // email 중복확인
  const [message, setMessage] = useState('');
  const checkDuplicateEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/checkemail', [email]);
      if (response.data.exists) {
        setMessage('이메일이 이미 존재합니다.');
      } else {
        setMessage('사용 가능한 이메일입니다.');
      }
    } catch (err) {
      // setMessage('에러가 발생했습니다. 다시 시도하세요.');
    }
  };

  // 비밀번호 확인
  // (1) 비밀번호 일치 여부 확인
  const [isPasswordMatching, setIsPasswordMatching] = useState(true);
  // (2) pw, confirmpw 값이 변경될 때마다 일치 여부 확인 및 업데이트
  useEffect(() => {
    if (password && confirmPassword) {
      setIsPasswordMatching(password === confirmPassword);
    }
  }, [password, confirmPassword]);



  // const [joinDate, setJoinDate] = useState('');
  // const [duplicateEmail, setDuplicateEmail] = useState(false);
  // const [duplicateMessage, setDuplicateMessage] = useState('');
  // const handleCheckDuplicate = () => {
  //   if(email) {
  //     axios.post('http://localhost:5000/checkEmail', { email: email })
  //       .then(response => {
  //         if(response.data.exists) {
  //           setDuplicateEmail(true);
  //           setDuplicateMessage('중복된 email이 있습니다.');
  //         } else {
  //           setDuplicateEmail(false);
  //           setDuplicateMessage('사용 가능한 email입니다.');
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error checking duplicate email:', error);
  //       });
  //   } else {
  //     setDuplicateMessage('이메일을 입력해주세요.');
  //   }
  // };



  /* handleSignup 함수는 회원가입 양식이 제출될 때 실행됩니다.
  사용자 정보를 한 객체로 묶은 후, axios.post를 사용하여 백엔드 서버에 전송합니다.
  서버의 응답을 기반으로 회원가입이 성공했는지 실패했는지를 결정하고 콘솔에 로그를 출력합니다.*/

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log('User Info:', password);
    // axios를 통한 데이터 전송
    // axios
    // .post('/getData', [email, password, confirmPassword, name, phoneNumber, birthYear, gender, nickname])
    // .then(res => console.log(res.data))


    // axios- async랑 await 이용
    /*
    try {
      // '/getData'자리에는 실제 백엔드 API 엔드포인트 URL로 변경해야돼!!!!!!!!!!!!!!!!!
      const response = await axios.post('/getData', [email, password, confirmPassword, name, phoneNumber, birthYear, gender, nickname]);
 
  
      if(response.data.success) { 
          console.log('회원가입 성공:', response.data);
          // 회원가입 후 추가적인 로직 (예: 홈페이지로 리다이렉트) 구현
          navigate('/');
      } else {
          console.error('회원가입 실패:', response.data.message);
      }
      } catch (error) {
          console.error('Error while signing up:', error);
    } 
    */
    axios.post('/user/getData', [email, password, confirmPassword, name, phoneNumber, birthYear, gender, nickname])
      .then(res => {
        console.log('백엔드에서 넘어온 데이터', res.data)
        navigate('/Login');
      })
      .catch(e => console.log("에러 :", e));
  };

  return (
    <StyledDiv>
      <StyledH1>회원가입 페이지</StyledH1>
      <StyledForm onSubmit={handleSignup}>
        <StyledDiv>
          <StyledLabel>Email: </StyledLabel>
          <StyledInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='이메일을 입력하세요'
          />
          <StyledButton type="button" onClick={checkDuplicateEmail}>중복확인</StyledButton>
          {/* 조건부 렌더링 */}
          {email && !isValidEmail && (
            <StyledSpan style={{ color: 'red' }}>
              이메일 형식이 올바르지 않습니다.
            </StyledSpan>
          )}
          <StyledP>{message}</StyledP>
        </StyledDiv>

        <StyledDiv>
          <StyledLabel>Password: </StyledLabel>
          <StyledInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='********'
          />
        </StyledDiv>

        <StyledDiv>
          <StyledLabel>Confirm Password: </StyledLabel>
          <StyledInput
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='********'
          />
          {/* 조건부 렌더링 => pw, cpw에 값이 있는 경우 true, true일 때만 span태그 렌더링됨 */}
          {password && confirmPassword && (
            <StyledSpan style={{ color: isPasswordMatching ? 'green' : 'red' }}>
              {isPasswordMatching ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
            </StyledSpan>
          )}
        </StyledDiv>

        <StyledDiv>
          <StyledLabel>Name: </StyledLabel>
          <StyledInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='홍길동'
          />
        </StyledDiv>

        <StyledDiv>
          <StyledLabel>Phone Number: </StyledLabel>
          <StyledInput
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder='01012341234'
          />
        </StyledDiv>

        <StyledDiv>
          <StyledLabel>Birth Year: </StyledLabel>
          <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)}>
            <option value="선택" disabled>선택</option> {/* disabled 속성은 이 옵션을 선택할 수 없도록 합니다. */}
            {Array.from({ length: 124 }, (_, i) => 2023 - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </StyledDiv>

        <StyledDiv>
          <StyledLabel>Gender: </StyledLabel>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="선택" disabled>선택</option> {/* disabled 속성은 이 옵션을 선택할 수 없도록 합니다. */}
            <option value="남">남</option>
            <option value="여">여</option>
          </select>
        </StyledDiv>

        <StyledDiv>
          <StyledLabel>Nickname: </StyledLabel>
          <StyledInput
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder='주정뱅이'
          />
        </StyledDiv>

        <br />
        <StyledButton type="submit">회원가입</StyledButton>
        {/* <button type="submit" onChange={e => setuserData('')}>회원가입</button> */}
      </StyledForm>
    </StyledDiv>
  );
}

export default SignUp