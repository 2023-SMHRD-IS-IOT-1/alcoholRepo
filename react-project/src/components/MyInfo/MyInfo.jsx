import React, { useState, useEffect } from 'react';
import './MyInfo.css';
import { Userinfo } from '../../data/Data';
import ProfileImg from './ProfileImg';
import { useImage } from './ImageContext';


const MyInfo = () => {
    const [profileImage, setProfileImage] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthYear, setBirthYear] = useState('선택');
    const [gender, setGender] = useState('선택');
    const [nickname, setNickname] = useState('');
    const { selectedImage } = useImage();
    const [goal, setGoal] = useState('');

    const [email, setEmail] = useState(''); // 초기값은 예시입니다.

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
        if (selectedImage) {
            setProfileImage(selectedImage);
        }
    }, [selectedImage]);

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

    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        // 예제를 위한 FormData 객체 생성
        const formData = new FormData();
        formData.append('profileImage', file);

        // 서버로 이미지 업로드
        try {
            const response = await fetch('/upload', { method: 'POST', body: formData });
            const data = await response.json();

            if (data.imageUrl) {
                setProfileImage(data.imageUrl); // 서버로부터 받은 이미지 URL로 상태 업데이트
            } else {
                alert('이미지 업로드에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('이미지 업로드 중 에러가 발생했습니다.');
        }
    }

    return (
        <div className='myInfoBox'>
            <h2 className='titleInfoBox'>마이페이지</h2>
            <div className="profile-section">
                {selectedImage && <img src={selectedImage} alt="내 캐릭터" />}  
                <button onClick={openModal}>사진 수정</button>
                
                {isModalOpen &&
                    (<ProfileImg 
                    isOpen={isModalOpen}
                    onClose={closeModal}                
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
                <label>Control Your Drinking :  </label>
                <select className='signupGoal' value={goal} onChange={(e) => setGoal(e.target.value)}>
                    <option value="선택">{`${(Userinfo[0].u_maxalcohol)/360}`+"병"}</option> 
                    {/* disabled 속성은 이 옵션을 선택할 수 없도록 함. */}
                    <option value="0.5">반병</option>
                    <option value="1">1병</option>
                    <option value="2">2병</option>
                    <option value="3">3병 이상</option>
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