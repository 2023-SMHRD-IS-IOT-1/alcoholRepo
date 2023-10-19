// StickerPicker.jsx

import React, { useState } from 'react';

function StickerPicker({ date, onDataUpdate }) {
    const [selectedSticker, setSelectedSticker] = useState('');
    const [storedBottleCount, setStoredBottleCount] = useState(0);
    const [storedGlassCount, setStoredGlassCount] = useState(0);

    const handleAddSticker = () => {
        if (!date || !selectedSticker) {
            alert('날짜와 스티커를 모두 선택해주세요.');
            return;
        }

        onDataUpdate((prevData) => ({
            ...prevData,
            // [date]: { sticker: selectedSticker }
            [date]: { sticker: selectedSticker }
        }));

        if (selectedDate) {
            // 음주량 데이터 업데이트
            const alcoholEntry = { alcohol: selectedSticker, 병: bottleCount, 잔: glassCount };
            const dateStr = selectedDate.toLocaleDateString();

            if (alcoholData[dateStr]) {
                alcoholData[dateStr].push(alcoholEntry);
            } else {
                alcoholData[dateStr] = [alcoholEntry];
            }

            setAlcoholData({ ...alcoholData });

            // 입력 필드 및 병, 잔 개수 초기화
            setSelectedSticker('');
            setBottleCount(0);
            setGlassCount(0);
        } else {
            alert('이때 병, 잔 표시되어야함')
            setStoredBottleCount(bottleCount);
            setStoredGlassCount(glassCount);
        }
    };
    const [selectedDate, setSelectedDate] = useState(null);
    const [alcoholData, setAlcoholData] = useState({});
    const [bottleCount, setBottleCount] = useState(0); // 병 개수
    const [glassCount, setGlassCount] = useState(0); // 잔 개수

    const updateAlcoholData = (date, data) => {
        setAlcoholData({ ...alcoholData, [date]: data });
    };

    const handleResetCounts = () => {
        setBottleCount(0);
        setGlassCount(0);
    };

    return (
        <div>
            <h3>{date}에 음주량 추가하기</h3>
            <select value={selectedSticker} onChange={(e) => setSelectedSticker(e.target.value)}>
                <option value="">주종 선택</option>
                <option value="soju">소주</option>
                <option value="beer">맥주</option>
            </select>

            <div className="data-container">
            {selectedDate && (
                <div>
                <h2>{selectedDate.toLocaleDateString()} 음주량</h2>
                {alcoholData[selectedDate.toLocaleDateString()] ? (
                    <ul>
                    {alcoholData[selectedDate.toLocaleDateString()].map((item, index) => (
                        <li key={index}>
                        주종: {item.alcohol}, 병: {item.병}, 잔: {item.잔}
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p>음주량 데이터가 없습니다.</p>
                )}
                </div>
            )}
            <div className="add-alcohol-form">
                <div>
                    <div>
                        <span>병 개수: {bottleCount}</span>
                        <button onClick={() => setBottleCount(bottleCount + 1)}>1병 추가</button>
                    </div>
                    <div>
                        <span>잔 개수: {glassCount}</span>
                        <button onClick={() => setGlassCount(glassCount + 1)}>1잔 추가</button>
                    </div>
                </div>
                <button onClick={handleAddSticker}>스티커 추가</button>

                <div className="stored-alcohol-info">
                    <h4>{date}음주량 기록</h4>
                    <p>병 : {storedBottleCount}</p>
                    <p>잔 : {storedGlassCount}</p>
                </div>
                
                
                <button onClick={handleResetCounts}>초기화</button>
            </div>
            </div>
        </div>
    );

}
export default StickerPicker;
