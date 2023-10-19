import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import '../components/CustomCalendar.css';
import CustomCalendar from '../components/02_CustomCalendar';


function MyAlcohol() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [alcoholData, setAlcoholData] = useState({});
  const [selectedAlcohol, setSelectedAlcohol] = useState(''); // 선택한 주종
  const [bottleCount, setBottleCount] = useState(0); // 병 개수
  const [glassCount, setGlassCount] = useState(0); // 잔 개수

  const updateAlcoholData = (date, data) => {
    setAlcoholData({ ...alcoholData, [date]: data });
  };

  const handleAddAlcohol = () => {
    if (!selectedDate) {
      alert('날짜를 선택하세요.');
      return;
    }

    if (!selectedAlcohol) {
      alert('주종을 선택하세요.');
      return;
    }

    const alcoholEntry = { alcohol: selectedAlcohol, 병: bottleCount, 잔: glassCount };
    const dateStr = selectedDate.toLocaleDateString();

    if (alcoholData[dateStr]) {
      alcoholData[dateStr].push(alcoholEntry);
    } else {
      alcoholData[dateStr] = [alcoholEntry];
    }

    setAlcoholData({ ...alcoholData });

    // 입력 필드 및 병, 잔 개수 초기화
    setSelectedAlcohol('');
    setBottleCount(0);
    setGlassCount(0);
  };

  const handleResetCounts = () => {
    setBottleCount(0);
    setGlassCount(0);
  };

  return (
    <div>
      <h1>My Alcohol Page</h1>
      <br/>
      <CustomCalendar/>

      {/* <div className="calendar-and-data"> */}
        {/* <div className="calendar">
          <CustomCalendar data={data} setData={setData} />  */}
          {/* props로 데이터 전달 */}
        {/* </div>
      </div> */}
        {/* <div className="calendar-container">
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div> */}
        
        {/* <div className="data-container">
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
            <h3>음주량 추가</h3>
            <select
              value={selectedAlcohol}
              onChange={(e) => setSelectedAlcohol(e.target.value)}
            >
              <option value="">주종 선택</option>
              <option value="소주">소주</option>
              <option value="맥주">맥주</option>
            </select>
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
            <button onClick={handleAddAlcohol}>추가</button>
            <button onClick={handleResetCounts}>초기화</button>
          </div>
        </div> */}
      </div>
    // </div>
  );
}

export default MyAlcohol;
