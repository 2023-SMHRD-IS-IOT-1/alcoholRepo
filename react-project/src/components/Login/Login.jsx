import React, { useEffect, useState } from 'react';
import './Login.css'
import axios from '../../axios';
import { Link, useNavigate } from 'react-router-dom';
import { Userinfo } from '../../data/Data';
// import KakaoLogin from '../components/01_KakaoLogin';
// import NaverLogin from '../components/01_NaverLogin';
// import '../styles/LoginForm.js';
// import styles from '../styles/LoginForm';

// 스타일 컴포넌트 임포트
import {
  StyledDiv, StyledH1, StyledForm, StyledLabel, 
  StyledInput, StyledButton, StyledSpan, StyledP, StyledA
} from '../Style';

const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const [message, setMessage] = useState('');
  
    // email 유효성 확인
    const [isValidEmail, setIsValidEmail] = useState(true);
    // email 유효성 검사
    
    useEffect(() => {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      setIsValidEmail(emailPattern.test(email));
    }, [email]);
  
  
    const handleLogin = async (e) => {
      e.preventDefault();
      // if (props.onLogin) {
      //   props.onLogin(email, password);
      // }
  
      if (!email || !isValidEmail) {
        setMessage('이메일을 입력해주세요.');
        return; // 아이디나 비밀번호가 입력되지 않았을 때 함수 종료
      }
  
      if (!password) {
        setMessage('비밀번호를 입력해주세요.');
        return; // 아이디나 비밀번호가 입력되지 않았을 때 함수 종료
      }
  
  
      try {
        const response = await axios.post('/user/getLogin', [ email, password]);
        console.log(response.data.data);
        if (response.data.data.length) {
          setMessage('로그인 성공!');
          console.log("로그인 성공");
          Userinfo.push({
            u_email : response.data.data[0].u_email,
            u_pw : response.data.data[0].u_pw,
            u_name : response.data.data[0].u_name,
            u_phone : response.data.data[0].u_phone,
            u_birthyear : response.data.data[0].u_birthyear,
            u_gender : response.data.data[0].u_gender,
            u_nickname : response.data.data[0].u_nickname,
            u_joindate : response.data.data[0].u_joindate,
            u_maxalcohol : response.data.data[0].u_maxalcohol,
            u_maxtime : response.data.data[0].u_maxtime,
          });
          console.log("유저인포확인", Userinfo);
          navigate('/Main');
        } else {
          console.log("로그인 실패");
          setMessage('로그인이 실패하였습니다.');
        }
      } catch (error) {
        //
      }
    }
  
    return (
      <StyledDiv>
        <StyledH1>Welcome to 혼~ㅁㅁ~술</StyledH1>
        <StyledForm onSubmit={handleLogin}>
          <StyledDiv>
            <StyledLabel>
              Email : 
              <StyledInput 
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </StyledLabel>
            {email && !isValidEmail && (
              <StyledSpan color="red">
                이메일 형식이 올바르지 않습니다.
              </StyledSpan>
            )}
          </StyledDiv>
          <StyledDiv>
            <StyledLabel>
              Password : 
              <StyledInput 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </StyledLabel>
          </StyledDiv>
          <StyledP>{message}</StyledP>
          <StyledDiv>
            <StyledButton type="submit">이메일 로그인</StyledButton>
          </StyledDiv>
          {/* <NaverLogin/> */}
          {/* <KakaoLogin/> */}
          <StyledDiv>
            <StyledA as={Link} to="/SignUp">회원가입</StyledA> <br />
            <StyledA as={Link} to="/Forgot">아이디/비밀번호 찾기</StyledA> 
          </StyledDiv>
        </StyledForm>
      </StyledDiv>
  
  
  
      // 기존 스타일 코드
      // <div style={styles.div}>
      // <h1 style={styles.h1}>Welcome to 혼~ㅁㅁ~술</h1>
  
      //     {/* <LoginForm onLogin={handleLogin} /> */}
          
      // <form style={styles.form} onSubmit={handleLogin}>
      //   <div style={styles.div}>
      //     <label style={styles.label}>
      //       Email : 
      //       <input 
      //         type="text"
      //         value={email}
      //         onChange={(e) => setEmail(e.target.value)}
      //       />
      //     </label>
      //     {/* 조건부 렌더링 */}
      //     {email && !isValidEmail && (
      //     <span style={{ ...styles.span, color: 'red' }}>
      //         이메일 형식이 올바르지 않습니다.
      //     </span>
      //     )}
      //   </div>
      //   <div style={styles.div}>
      //     <label style={styles.label}>
      //       Password : 
      //       <input 
      //         type="password"
      //         value={password}
      //         onChange={(e) => setPassword(e.target.value)}
      //       />
      //     </label>
      //   </div>
      //   <br />
      //   <p style={styles.p}>{message}</p>
      //   <div style={styles.div}>
      //     <button style={styles.button} type="submit">이메일 로그인</button>
      //   </div>
      //   {/* <div>
      //     <button type="submit">Naver 로그인</button>
      //   </div> */}
      //   <NaverLogin/>
      //   <KakaoLogin/>
      //   {/* <div>
      //     <button type="submit">카카오톡 로그인</button>
      //   </div> */}
  
      //   <br />
      //   <div style={styles.div}>
      //     <Link to="/signup"  style={styles.a}>회원가입</Link> <br />
      //     <Link to="/forgot"  style={styles.a}>아이디/비밀번호 찾기</Link> 
      //   </div>
  
      // </form>
      // </div>
    );
}

export default Login