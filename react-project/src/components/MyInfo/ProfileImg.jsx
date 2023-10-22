import React, { useState } from 'react';
import './ProfileImg.css';
import donotSticker from '../../data/donotAlcohol.png';
import fullSticker from '../../data/fullAlcohol.png';
import pushSticker from '../../data/pushAlcohol.png';
import soakSticker from '../../data/soakAlcohol.png';
import princessSticker from '../../data/princessAlcohol.png';
import needSticker from '../../data/needAlcohol.png';
import onemoreSticker from '../../data/onemoreAlcohol.png';
import waveSticker from '../../data/waveAlcohol.png';
import bottleSticker from '../../data/bottleAlcohol.png';
import { Userinfo } from '../../data/Data';

function ProfileImg({isOpen, onClose, onImageChange}) {

  const images = {
    donotSticker, fullSticker, pushSticker, soakSticker,
    princessSticker, needSticker, onemoreSticker, waveSticker, bottleSticker
  };
  // img클릭시 테두리색 변경하기
  const [selectedImg, setSelectedImg] = useState(null);
  
  const handleImgClick = (imgName) => {
    const imgUrl = images[imgName];
    Userinfo[0].u_imgchange = imgName;
    setSelectedImg(imgName);
    onImageChange(imgUrl);
  }

  const handleCharChangeClick = () => {
    setSelectedImg(selectedImg);
  }

  return (
    <div className={`profile ${isOpen ? 'open' : ''}`} onClick={onClose}>
        <div className="profile-content" onClick={e => e.stopPropagation()}>

          {Object.keys(images).map((imgName) => (
            <img 
              key={imgName}
              className={selectedImg === imgName ? 'selected' : ''} 
              src={images[imgName]} 
              alt={imgName} 
              onClick={() => handleImgClick(imgName)}
            />
          ))}
{/* 
                <img className={selectedImg === 'donotSticker' ? 'selected' : ''} src={donotSticker} alt="금주입니다" onClick={() => handleImgClick('donotSticker')}/>
                <img className={selectedImg === 'fullSticker' ? 'selected' : ''} src={fullSticker} alt="나 취해써" onClick={() => handleImgClick('fullSticker')}/>
                <img className={selectedImg === 'pushSticker' ? 'selected' : ''} src={pushSticker} alt="술 드가자~" onClick={() => handleImgClick('pushSticker')}/>
                <img className={selectedImg === 'soakSticker' ? 'selected' : ''} src={soakSticker} alt="조그만 적셔~" onClick={() => handleImgClick('soakSticker')}/>
                <img className={selectedImg === 'needSticker' ? 'selected' : ''} src={needSticker} alt="알콜이 피료해.." onClick={() => handleImgClick('needSticker')}/>
                <img className={selectedImg === 'princessSticker' ? 'selected' : ''} src={princessSticker} alt="술공주 등장~" onClick={() => handleImgClick('princessSticker')}/>
                <img className={selectedImg === 'onemoreSticker' ? 'selected' : ''} src={onemoreSticker} alt="한잔만!" onClick={() => handleImgClick('onemoreSticker')}/>
                <img className={selectedImg === 'waveSticker' ? 'selected' : ''} src={waveSticker} alt="알딸딸" onClick={() => handleImgClick('waveSticker')}/>
                <img className={selectedImg === 'bottleSticker' ? 'selected' : ''} src={bottleSticker} alt="꼬로로로록~" onClick={() => handleImgClick('bottleSticker')}/> */}

            </div>    
        <div>
            <button className='charChangebtn' onClick={handleCharChangeClick}>캐릭터 수정</button>
        </div>
    </div>
  )
}

export default ProfileImg