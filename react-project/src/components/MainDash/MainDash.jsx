import React from 'react'
import './MainDash.css'
import { Cards, Table } from '..'
import sojumain from '../../data/soju.jpg';
import { CardsData1 } from '../../data/Data';

const MainDash = () => {
  return (
    <div className='MainDash'>
        <h1>나의 음주 관리</h1>
        <img src={sojumain} alt="" />
    </div>
  )
}

export default MainDash