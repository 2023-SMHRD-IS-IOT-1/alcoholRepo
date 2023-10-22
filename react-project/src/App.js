/* // import logo from './logo.svg';
import './App.css';
import DataSend from './components/DataSend';

function App() {
  return (
    <div>
      <DataSend />
    </div>
  );
}

export default App;
 */

import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom';
import { InitPage, Main, Calendar, Analytics, SignUpPage, ForgotPage, MyPage } from './pages';
import { Footer, Header } from './components';
import Sidebar from './components/Sidebars/Sidebar';
/* import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RightSide/RightSide';
import Sidebar from './components/Sidebars/Sidebar'; */

function App() {
  const location = useLocation();
  console.log('location', location);
  console.log('check', location.pathname);

  // location.pathname이 "/"일 때만 Sidebar, Header, Footer를 렌더링하지 않음
  if (location.pathname === "/" || location.pathname === "/SignUp" || location.pathname === "/Forgot") {
    return (
      <div className="App">
        <div className="AppUser">
          <Routes>
            <Route path="/" element={(<InitPage />)} />
            <Route path="/SignUp" element={(<SignUpPage />)} />
            <Route path="/Forgot" element={(<ForgotPage />)} />
          </Routes>
        </div>
      </div>
    );
  } else {

    return (
      <div className="App">
        <div className='AppGlass'>
          <Sidebar />
          <div>
            <Header />
            <Routes>
              <Route path="/Main" element={(<Main />)} />
              <Route path="/Calendar" element={(<Calendar />)} />
              <Route path="/Analytics" element={(<Analytics />)} />
              <Route path="/MyPage" element={(<MyPage />)} />
              {/* <Route path="/Login" element={(<LoginPage />)} /> */}
            </Routes>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
