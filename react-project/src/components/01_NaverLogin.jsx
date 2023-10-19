import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    const naverLogin = new window.naver.LoginWithNaverId(
      {
        clientId: "tbCgXXC4GVbSCxxQENiY",
        callbackUrl: "Sj8XezJ28Q",
        isPopup: true,
        loginButton: { color: "green", type: 3,  height: 45 }
      }
    );

    naverLogin.init();
  }, []);

  return (
    <div>
      <div id="naverIdLogin"></div>
    </div>
  );
}

export default App;
