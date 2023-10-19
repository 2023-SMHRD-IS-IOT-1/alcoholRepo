import React, { useState } from 'react';
import Header from './Header';
import Calendar from './Calendar';
import Modal from './Modal';
// import Sticker from './Sticker';

function App() {
    const [date, setDate] = useState(new Date());
    const [data, setData] = useState({});
    // const yourUpdateFunction = (updatedData) => {
    //     setData(prevData => ({
    //         ...prevData,
    //         ...updatedData
    //     }));
    // }
    const [alcoholData, setAlcoholData] = useState({});


    return (
        <div className="wrap col-flex jcc aic">
            <Header date={date} setDate={setDate} />
            <Calendar date={date}  alcoholData={data} setAlcoholData={setData} />
            <Modal setAlcoholData={setAlcoholData} />

        </div>
    );
}

export default App;
