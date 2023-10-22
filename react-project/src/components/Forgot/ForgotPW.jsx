import React, { useEffect, useState } from 'react'
import './ForgotPW.css'

import axios from '../../axios';
import { useNavigate } from 'react-router-dom';

import {
    StyledDiv, StyledH1, StyledForm, StyledH3, StyledLabel,
    StyledInput, StyledButton, StyledSpan, StyledP
} from '../Style'

const ForgotPW = ({ email, isOpen, onClose }) => {

    const [changePW, setChangePW] = useState('');
    const [changePWCheck, setChangePWCheck] = useState('');
    const [isPasswordMatching, setIsPasswordMatching] = useState(true);

    const navigate = useNavigate();

    // (2) pw, confirmpw 값이 변경될 때마다 일치 여부 확인 및 업데이트
    useEffect(() => {
        if (changePW && changePWCheck) {
            setIsPasswordMatching(changePW === changePWCheck);
        }
    }, [changePW, changePWCheck]);

    const handleChangePW = async (e) => {
        e.preventDefault();
        console.log("PW 변경 시도");
        if (changePW === changePWCheck) {
            try {
                const response = await axios.post('/user/ChangePW', [email, changePW, changePWCheck]);
                if (response.data.exists) {
                    console.log("PW 변경 성공");
                    console.log("받는 데이터", response.data.data[0].u_pw);
                    alert('비밀번호가 성공적으로 변경되었습니다.');
                    navigate('/');
                    // history.back();
                } else {
                    console.log("PW 변경 실패");
                }
            } catch (err) {
                // setMessage('에러가 발생했습니다. 다시 시도하세요.');
            }
        } else {
            console.log("PW 다름");
        }
    }
    return (

        <div className={`modalPW ${isOpen ? 'open' : ''}`}>
            <form onSubmit={handleChangePW}>
                <div className="modalPWcontent">
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
            </form>
            <div>
                <StyledButton className='close' onClick={onClose}>비밀번호 변경 취소</StyledButton>
            </div>
        </div >

    )
}

export default ForgotPW