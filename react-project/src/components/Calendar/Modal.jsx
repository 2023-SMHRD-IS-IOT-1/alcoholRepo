import React from 'react';
import './CalendarStyle.css';
import './Calendar';
import sojuSticker from '../../data/soju_cham.png';
import beerSticker from '../../data/beer.png';
import somakSticker from '../../data/somak.png'; 



function Modal({ isOpen, onClose, selectedDate, alcoholData, setAlcoholData}) {

    const handleAddAlcohol = (stickerType) => {
         // 스티커 타입이 없거나 유효하지 않은 경우를 처리합니다.
        if (!stickerType || (stickerType !== 'soju' && stickerType !== 'beer')) {
        alert('유효하지 않은 스티커 타입입니다.');
        return;
        }
        // 해당 날짜의 기존 데이터를 가져옵니다.
        const currentDateData = alcoholData[selectedDate] || {};
        const currentCount = currentDateData[stickerType] || 0; 

        // 해당 날짜의 데이터에 새로운 스티커를 추가합니다.
        // const updatedDateData = {
        //     ...currentDateData,
        //     stickers: [...(currentDateData.stickers || []), stickerType]
        // };

        const updatedDateData = {
            ...currentDateData,
            [stickerType]: currentCount + 1
        };
    
        // 전체 알코올 데이터를 업데이트합니다.
        setAlcoholData({
            ...alcoholData,
            [selectedDate]: updatedDateData
        });
        
        // 스티커 리스트에 선택한 스티커를 추가합니다.
        // setStoredStickers(prev => [...prev, stickerType]);
    }


    // const [alcoholData, setAlcoholData] = useState({});

    // const updateAlcoholData = (selectedDate, data) => {
    //     setAlcoholData({ ...alcoholData, [selectedDate]: data });
    // };

    const handleResetCounts = () => {
        const updatedData = { ...alcoholData };
        if (updatedData[selectedDate]) {
            delete updatedData[selectedDate];
        }
        setAlcoholData(updatedData);

        // // 스티커 초기화
        // setStoredStickers([]);
    };

    if (!isOpen) return null;

    // const currentStickers = alcoholData[selectedDate]?.stickers || [];
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
                    <button className='sojuSticker' onClick={() => handleAddAlcohol('soju')}>
                        소주
                    </button>
                    <button className='beerSticker' onClick={() => handleAddAlcohol('beer')}>
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