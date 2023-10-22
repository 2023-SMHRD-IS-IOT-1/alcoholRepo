import React, { useEffect } from 'react';
import './ForgotEmail.css'


const ForgotEmail = ({ modalContentID, isOpen, onClose }) => {
    let myEmail = ''
    useEffect(() => {
        console.log("이메일확인", modalContentID);
        console.log("오픈확인", isOpen);
        console.log("클로즈확인", onClose);
        myEmail = modalContentID;
    }, []);
    return (
        <div className={`modalID ${isOpen ? 'open' : ''}`}>
            <div className="modalID-content">
                <p>찾은 이메일</p>
                <p>{modalContentID}</p>
            </div>
            <div>
                <button className='close' onClick={onClose}>Email 확인 완료</button>
            </div>
        </div>
    )
}

export default ForgotEmail