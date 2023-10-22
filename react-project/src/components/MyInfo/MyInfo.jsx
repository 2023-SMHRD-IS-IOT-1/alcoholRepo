import React, { useState, useEffect } from 'react';
import './MyInfo.css';
import { Userinfo } from '../../data/Data';
import ProfileImg from './ProfileImg';
import donotSticker from '../../data/donotAlcohol.png';
import fullSticker from '../../data/fullAlcohol.png';
import pushSticker from '../../data/pushAlcohol.png';
import soakSticker from '../../data/soakAlcohol.png';
import princessSticker from '../../data/princessAlcohol.png';
import needSticker from '../../data/needAlcohol.png';
import onemoreSticker from '../../data/onemoreAlcohol.png';
import waveSticker from '../../data/waveAlcohol.png';
import bottleSticker from '../../data/bottleAlcohol.png';

const MyInfo = () => {
    // const [profileImage, setProfileImage] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthYear, setBirthYear] = useState('선택');
    const [gender, setGender] = useState('선택');
    const [nickname, setNickname] = useState('');
    const [selectedImg, setSelectedImg] = useState('');
    const [goal, setGoal] = useState('');
    const [time, setTime] = useState('');
    const [email, setEmail] = useState(''); 

    console.log(Userinfo[0].u_img);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/user/${email}`);
                const data = await response.json();
                
                if (data) {
                    setName(data.name);
                    setPhoneNumber(data.phoneNumber);
                    setNickname(data.nickname);
                    setBirthYear(data.birthYear);
                    setGender(data.gender);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [email]);

    // 사진변경 모달창 오픈!
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }
    // 프로필사진 변경을 위한 함수 => selectedImage  상태가 변경될 때마다 실행되도록
    useEffect(() => {
        if (selectedImg) {
            // setSelectedImg(selectedImg);
        }
    }, [selectedImg]);

    const handleImageChange =(imgUrl) => {
        setSelectedImg(imgUrl);
    }

    // 비밀번호 확인하기
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }
    const checkPasswordMatch = () => {
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
        }else {
            alert('비밀번호가 일치합니다.');
        }
    }

    return (
        <div className='myInfoBox'>
            <h2 className='titleInfoBox'>마이페이지</h2>
            <div className="profile-section">
                {/* <img src={Userinfo[0].u_img} alt="프로필 이미지" ></img> */}
                <img src={selectedImg} alt="프로필 이미지" ></img>
                <button onClick={openModal}>사진 수정</button>
                
                {isModalOpen &&
                    (<ProfileImg 
                    isOpen={isModalOpen}
                    onClose={closeModal}    
                    onImageChange={handleImageChange}            
                />)}

            </div>
            <br />

            <div className="info-section">
                <label htmlFor="username">Email :  </label>
                <input type="text" id="username" value={Userinfo[0].u_email}readOnly />
            
            <br />

                <label htmlFor="password">Password :  </label>
                <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                <br />

                <label htmlFor="confirm-password">Password Check : </label>
                <input type="password" id="confirm-password" value={confirmPassword} onChange={handleConfirmPasswordChange} />

                <button className='checkPw' onClick={checkPasswordMatch} id="password-check-btn">비밀번호 확인</button>

            
                <br />
                <label>Name: </label>
                <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={Userinfo[0].u_name}
                />
                <br/>
                <label>Nickname :  </label>
                <input 
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder={Userinfo[0].u_nickname}
                />

                <br/>
                <label>Phone Number :  </label>
                <input 
                type="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder = {Userinfo[0].u_phone}
                />

                <br/>
                <label>Birth Year :  </label>
                <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)}>
                    <option value="선택">{`${Userinfo[0].u_birthyear}`}</option>
                    {Array.from({length: 124}, (_, i) => 2023 - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
                </select>

                <br/>
                <label>Gender :  </label>
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="선택">{`${Userinfo[0].u_gender}`}</option>
                    <option value="남">남</option>
                    <option value="여">여</option>
                </select>

                <br/>
                <label>일주일 설정 주량(소주 기준) :  </label>
                <select className='signupGoal' value={goal} onChange={(e) => setGoal(e.target.value)}>
                    <option value="선택">{`${(Userinfo[0].u_maxalcohol)/360}`+"병"}</option> 
                    {/* disabled 속성은 이 옵션을 선택할 수 없도록 함. */}
                    <option value="180">반병</option>
                    <option value="360">1병</option>
                    <option value="720">2병</option>
                    <option value="1080">3병 이상</option>
                    <option value="1440">4병</option>
                    <option value="1800">5병</option>
                    <option value="2160">6병</option>
                    <option value="2520">7병</option>
                    <option value="2880">8병</option>
                    <option value="3240">9병</option>
                    <option value="3600">10병</option>
                </select>

                <br/>
                <label>일주일 설정 시간 :  </label>
                <select className='signupGoal' value={time} onChange={(e) => setTime(e.target.value)}>
                    <option value="선택">{`${(Userinfo[0].u_maxtime)/60}`+"시간"}</option> {/* disabled 속성은 이 옵션을 선택할 수 없도록 합니다. */}
                    <option value="30">30분</option>
                    <option value="60">1시간</option>
                    <option value="120">2시간</option>
                    <option value="180">3시간</option>
                    <option value="240">4시간</option>
                    <option value="300">5시간</option>
                    <option value="360">6시간</option>
                    <option value="420">7시간</option>
                    <option value="480">8시간</option>
                    <option value="540">9시간</option>
                    <option value="600">10시간</option>
                </select>
            
            </div>
                <br/>
                <form>
                <button className='editMyInfoBtn' onClick={() => document.getElementById('info-upload').click()} id="edit-myInfo-btn">
                    회원정보수정
                </button>
                </form>
            </div>       
    );
}

export default MyInfo