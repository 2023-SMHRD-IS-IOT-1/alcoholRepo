import React from 'react';
import './CalendarStyle.css';
import './Calendar';
import { UserData } from '../../data/Data';
import sojuSticker from '../../data/soju_cham.png';
import beerSticker from '../../data/beer.png';
import somakSticker from '../../data/somak.png'; 



function Modal({ isOpen, onClose, selectedDate, alcoholData, setAlcoholData}) {

    const handleAddSoju = (stickerType) => {
         // 스티커 타입이 없거나 유효하지 않은 경우를 처리.
        if (!stickerType || (stickerType !== 'soju' && stickerType !== 'beer')) {
        alert('유효하지 않은 스티커 타입입니다.');
        return;
        }
        // 해당 날짜의 기존 데이터를 가져옴
        // 여기에 userdata 들어가는 게 맞나????????????????????????
        const currentDateData = alcoholData[selectedDate] || {};
        const currentCount = currentDateData[stickerType] || 0; 

        // db에 저장된 ml를 병단위로 변환
        // const sojuValue = UserData[0].soju_ml / 360;
        const sojuValue = UserData && UserData.length > 0 ? UserData[0].soju_ml / 360 : 0;

        const updatedDateData = {
            ...currentDateData,
            [stickerType]: currentCount + 1,
            dbsoju: (currentDateData.dbsoju || 0) + sojuValue
        };
    
        // 전체 알코올 데이터를 업데이트합니다.
        setAlcoholData({
            ...alcoholData,
            [selectedDate]: updatedDateData
        });
    }

    const handleAddBeer = (stickerType) => {
        // 스티커 타입이 없거나 유효하지 않은 경우를 처리.
       if (!stickerType || (stickerType !== 'soju' && stickerType !== 'beer')) {
       alert('유효하지 않은 스티커 타입입니다.');
       return;
       }
       // 해당 날짜의 기존 데이터를 가져옴
       // 여기에 userdata 들어가는 게 맞나????????????????????????
       const currentDateData = alcoholData[selectedDate] || {};
       const currentCount = currentDateData[stickerType] || 0; 

    //    const beerValue = UserData[0].beer_ml / 500;
       const beerValue = UserData && UserData.length > 0 ? UserData[0].beer_ml / 500 : 0;

       const updatedDateData = {
           ...currentDateData,
           [stickerType]: currentCount + 1,
           dbbeer: (currentDateData.dbbeer || 0) + beerValue
       };
   
       // 전체 알코올 데이터를 업데이트합니다.
       setAlcoholData({
           ...alcoholData,
           [selectedDate]: updatedDateData
       });
   }

    const handleResetCounts = () => {
        const updatedData = { ...alcoholData };
        if (updatedData[selectedDate]) {
            delete updatedData[selectedDate];
        }
        setAlcoholData(updatedData);
    };

    if (!isOpen) return null;

    const currentCounts = alcoholData && alcoholData[selectedDate] ? alcoholData[selectedDate] : {};
    const sojuCount = currentCounts.soju || 0;
    const beerCount = currentCounts.beer || 0;
    
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>{selectedDate} 주량 일기😁</h3>
            </div>
                <button className='modal-closed' onClick={onClose}>X</button>
                <br />
                <div className="modal-content">
                    <div className='stickerBox'>
                    {sojuCount > 0 && beerCount > 0 && (
                    <img src={somakSticker} alt="somak" className="somak" />
                    )}
                    {sojuCount > 0 && beerCount === 0 && (
                        <img src={sojuSticker} alt="soju" className="soju" />
                    )}
                    {beerCount > 0 && sojuCount === 0 && (
                        <img src={beerSticker} alt="beer" className="beer" />
                    )}
                    </div>
                        
                    <div className="stored-alcohol-info"> 
                        <h4>음주량 기록</h4>
                        <p>소주: {sojuCount} 병</p>
                        <p>맥주: {beerCount} 병</p>
                    </div>                 
                </div>
                <div className='buttonAll'>
                    <button className='sojuSticker' onClick={() => handleAddSoju('soju')}>
                        소주
                    </button>
                    <button className='beerSticker' onClick={() => handleAddBeer('beer')}>
                        맥주
                    </button>
                    <button className='modal-reset' onClick={handleResetCounts}>초기화</button>
                </div>
            <div>                
            </div>
        </div>
    );
}

export default Modal;