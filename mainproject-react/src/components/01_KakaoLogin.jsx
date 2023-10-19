// KakaoLogin.js

import React, { useEffect } from 'react';
import './01_KakaoLogin.css';


const KakaoLogin = () => {
  useEffect(() => {
    // 카카오 SDK 초기화 => if문은 다중초기화를 방지하기 위해 사용
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('3f5c796203887a1421a945b81dead6b3');
    }
  }, []);

  const handleLogin = () => {
    window.Kakao.Auth.login({
      success: function(response) {
        console.log(response);
        // 성공 시 로직 구현
      },
      fail: function(error) {
        console.error(error);
      },
    });
  };

  return (
    <div>
      <button className="kakao-login-button" onClick={handleLogin}>
        <img src="/LogoKakao.png" alt="Kakao" className="kakao-icon" />
        카카오톡으로 로그인</button>
    </div>
  );
}

export default KakaoLogin;

