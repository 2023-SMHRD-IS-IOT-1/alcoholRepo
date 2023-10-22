import React, { useEffect, useState } from 'react';
import './Init.css';

import Logo from '../../imgs/logo.png';
import { LoginPage } from '../../pages';

const Init = () => {
  // 초기에 애니메이션을 비활성화하는 상태
  const [animating, setAnimating] = useState(false);
  const [pagelink, setPagelink] = useState(false);

  const startAnimation = () => {
    // 이미지를 클릭하면 애니메이션을 시작
    setAnimating(true);

    // 3초 후에 다른 페이지로 이동
    setTimeout(() => {
      setPagelink(true);
    }, 2100);
  };

  useEffect(() => {
    // 3초 후에 애니메이션을 활성화
    const timeoutani = setTimeout(() => {
      setAnimating(true);
      const timeoutpg = setTimeout(() => {
        setPagelink(true);
        return () => {
            clearTimeout(timeoutpg);
          };
      }, 2100);
    }, 3000);

    if (pagelink) {
      const page = document.querySelector('.transition-fade');
      page.classList.add('active');
    }

    // 컴포넌트 언마운트 시 타이머 클리어
    return () => {
      clearTimeout(timeoutani);
    };
  }, [pagelink]);

  return (
    <div className='initpage'>
      <div className={`image-container ${animating ? 'animate' : ''}`} onClick={startAnimation}>
        <img className='logoimage' src={Logo} alt="LogoImage" />
        <p className={`move-message ${animating ? 'animate' : ''}`}></p>
      </div>
      

      {/* 이미지 애니메이션이 끝난 후 Main 페이지로 이동하는 Link */}
      {pagelink && (
        <div className='loginpage transition-fade'>
        <LoginPage />
        </div>
      )}
    </div>
  );
}

export default Init;
