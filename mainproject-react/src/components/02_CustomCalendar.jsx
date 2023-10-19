import React, {useState} from 'react';
// import './Calendar.css';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css';
import Sticker from './Sticker';
import Calendar from 'react-calendar';
// import CustomCalendar from '../components/02_CustomCalendar';


function CustomCalendar() {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    const [data, setData] = useState({
        '2023-10-14': { hasEvent: true, sticker: 'bottle' }
    });

    const [showStickerPicker, setShowStickerPicker] = useState(false);
    const [clickedDate, setClickedDate] = useState('');

    const handleDateClick = (date) => {
        setClickedDate(date.toLocaleDateString());
        setShowStickerPicker(true);
    };

  return (
    <div className="calendar-and-data">
        <div className="calendar-container">
            {/* <Calendar className="my-custom-calendar" 
            onChange={handleDateChange} 
            value={selectedDate} 
            tileContent={({ date, view }) => view === 'month' && date.getDay() === 6 ? 
                <div className="my-weekend-style">
                    토요일이지롱</div> 
            : null} /> */}

            {/* <Calendar 
                tileContent={({ date, view }) => {
                    if (view === 'month') {
                    const dateString = date.toLocaleDateString();
                    if (data[dateString]?.sticker) {
                        return <div className={`sticker ${data[dateString].sticker}`}></div> */}
            <Calendar 
                className="my-custom-calendar"
                onChange={handleDateChange}
                onClickDay={handleDateClick}  // 날짜 클릭시 handleDateClick 호출 
                value={selectedDate}
                tileContent={({ date, view }) => {
                    // 월(Month) 뷰에서만 내용을 표시
                    if (view === 'month') {
                        const dateString = date.toLocaleDateString();

                        // 특정 날짜에 스티커가 있으면 스티커를 표시
                        if (data[dateString]?.sticker) {
                            return <div className={`sticker custom-sticker ${data[dateString].sticker}`}></div>;
                            // 스키터 렌더링 부분 => classname : custom-sticker
                        }

                        // 토요일에 대한 텍스트 표시
                        if (date.getDay() === 6) {
                            return <div className="my-weekend-style">토요일이지롱</div>;
                        }
                    }
                    return null;  // 아무것도 반환하지 않는 경우
                }} 
            />
            {showStickerPicker && <Sticker date={clickedDate} onDataUpdate={setData} />}
        </div>
        {/* <Sticker data={data} onDataUpdate={setData} /> */}
    </div>
  );
};

export default CustomCalendar;
