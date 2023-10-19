import React from 'react'
import './MainDash.css'
import { Cards, Table } from '../../components'
import sojumain from '../../data/soju.jpg';
import { CardsData1 } from '../../data/Data';

const MainDash = () => {
  console.log(CardsData1);
  return (
    <div className='MainDash'>
        <h1>나의 음주 관리</h1>
        <img src={sojumain} alt="" />
        <Cards />
        <Table />
    </div>
  )
}

export default MainDash