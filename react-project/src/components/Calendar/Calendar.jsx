// 달력 그리드를 만드는 컴포넌트 => 현재 date를 기준으로 일자들을 생성. 일정 로직은 간소화.

import React, { useState } from 'react';
import './CalendarStyle.css';
import Modal from './Modal';
import sojuSticker from '../../data/soju_cham.png';
import beerSticker from '../../data/beer.png';
import somakSticker from '../../data/somak.png'; 


function Calendar({ date }) {
    // ,  alcoholData, setAlcoholData
    const today = new Date();
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    // month는 0부터 시작하므로 +1 필요
    const [alcoholData, setAlcoholData] = useState({});

    function getFirstDay(y, m) {
        const firstDay = new Date(y, m - 1, 1);
        return firstDay.getDay();
    }

    function getLastDay(y, m) {
        const lastDay = new Date(y, m, 0);
        return lastDay.getDate();
    }

    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT'];

    // const dateKey = formatDate(date); // 예: '2023-10-15'
    // // const hasData = alcoholData[dateKey] && alcoholData[dateKey].stickers && alcoholData[dateKey].stickers.length > 0;

    const dates = [];
    for (let i = -getFirstDay(y, m) + 1; i <= getLastDay(y, m); i++) {
        const isHidden = i < 1;
        const isToday = i === today.getDate() && m === today.getMonth() + 1 && y === today.getFullYear();

        const dateKey = formatDate(new Date(y, m - 1, i)); 
        // const hasData = alcoholData[dateKey] && alcoholData[dateKey].sticker; 
        const hasData = alcoholData[dateKey] && alcoholData[dateKey].stickers && alcoholData[dateKey].stickers.length > 0; 

        // 날짜를 생성할 때 스티커를 표사하는 로직을 추가해야함!!!!!!!
        const currentData = alcoholData[dateKey] || {};
        const sojuCount = currentData.soju || 0;
        const beerCount = currentData.beer || 0;

        const stickers = [];
        if (sojuCount > 0 && beerCount > 0) {
            stickers.push(<img src={somakSticker} alt="somak" className="somak" />);
        } else if (sojuCount > 0) {
            stickers.push(<img src={sojuSticker} alt="soju" className="soju" />);
        } else if (beerCount > 0) {
            stickers.push(<img src={beerSticker} alt="beer" className="beer" />);
        }

        dates.push(
            <div key={i} className={`date ${isHidden ? "hidden-date" : ""} ${isToday ? "today" : ""} ${hasData ? 'has-data' : ''}`}>
                <p>{i}</p>
                {stickers}
            </div>
        );
    }
    
    // 날짜칸에 데이터 있으면 핑크색으로 바뀌도록 만들기 위해 정의한 함수
    function formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString();
        const day = date.getDate().toString();
        // .padStart 메서드 : 한자리인 경우 앞에 0을 붙여 2자리 수로 만듦. .padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateClick = (date) => {
        if (date > 0) {
            setSelectedDate(`${y}-${m}-${date}`);
            setIsModalOpen(true);
        }
    };

    return (
        <div>
            <div className="calendar">
                {daysOfWeek.map(day => (
                    <div key={day} className="calendar-top">
                        {day}
                    </div>
                ))}

                {dates.map(date => (
                    <div
                        key={date.key}
                        className={date.props.className}
                        // className={`${date.props.className} ${hasData ? 'has-data' : ''}`} .has-data가 중복되어 삭제해줌
                        onClick={() => !date.props.className.includes("hidden-date") && handleDateClick(date.key)}
                    >
                        {date.props.children}
                    </div>
                ))}

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedDate={selectedDate} alcoholData={alcoholData} setAlcoholData={setAlcoholData} />
            </div>
        </div>
    );
}

export default Calendar;
