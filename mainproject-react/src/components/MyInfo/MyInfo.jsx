import React, { useState, useEffect } from 'react';
import './MyInfo.css'

const MyInfo = () => {
    const [profileImage, setProfileImage] = useState('path_to_profile_image.jpg');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthYear, setBirthYear] = useState('선택');
    const [gender, setGender] = useState('선택');
    const [nickname, setNickname] = useState('');

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
                    // ... 다른 상태 변수들도 데이터베이스의 값으로 설정
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [email]);


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

    // const handleImageEdit = () => {
    //     // 프로필 사진 수정 로직
    // }

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
        <div>
            <h2>마이페이지</h2>
            <div className="profile-section">
                <img src={profileImage} alt="프로필 사진" id="profile-image" />
                <input type="file" id="image-upload" onChange={handleImageChange} style={{ display: 'none' }} />
                <button onClick={() => document.getElementById('image-upload').click()} id="edit-image-btn">
                    사진 수정
                </button>
            </div>
            <br />

            <div className="info-section">
                <label htmlFor="username">이메일:</label>
                <input type="text" id="username" value={email} readOnly />
            </div>
            <br />

                <label htmlFor="password">비밀번호:</label>
                <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                <br />

                <label htmlFor="confirm-password">비밀번호 확인:</label>
                <input type="password" id="confirm-password" value={confirmPassword} onChange={handleConfirmPasswordChange} />

                <button onClick={checkPasswordMatch} id="password-check-btn">비밀번호 확인</button>

            
                <br />
                <label>Name: </label>
                <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <br/>
                <label>Phone Number: </label>
                <input 
                type="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <br/>
                <label>Birth Year: </label>
                <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)}>
                    <option value="선택" disabled>선택</option> {/* disabled 속성은 이 옵션을 선택할 수 없도록 합니다. */}
                {Array.from({length: 124}, (_, i) => 2023 - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
                </select>

                <br/>
                <label>Gender: </label>
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="선택" disabled>선택</option> {/* disabled 속성은 이 옵션을 선택할 수 없도록 합니다. */}
                <option value="남">남</option>
                <option value="여">여</option>
                </select>

                <br/>
                <label>Nickname: </label>
                <input 
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                />

                <br/>
                <button onClick={() => document.getElementById('info-upload').click()} id="edit-myInfo-btn">
                    회원정보수정
                </button>
{/* 
                <label htmlFor="age">나이:</label>
                <input type="text" id="age" value="25" readOnly /> */}
            </div>
        
    );
}

export default MyInfo