import React from 'react';
import './CalendarStyle.css';

function Header({ date, setDate }) {
    const addMonth = (increment) => {
        const newDate = new Date(date);
        newDate.setMonth(date.getMonth() + increment);
        setDate(newDate);
    };

    return (
        <div className="header flex aic" style={{ gap: '40px' }}>
            <button onClick={() => addMonth(-1)}>◀</button>
            <h1 className="cur-date">{`${date.getFullYear()}. ${date.getMonth() + 1}.`}</h1>
            <button onClick={() => addMonth(1)}>▶</button>
        </div>
    );
}

export default Header;
