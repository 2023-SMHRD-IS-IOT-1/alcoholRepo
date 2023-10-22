import React from 'react'
import './MainDash.css'
import { Cards, DataCheck, Table } from '..'
import sojumain from '../../data/soju.jpg';
import imgtest from '../../data/fullAlcohol.png'
import { CardsData1 } from '../../data/Data';

const MainDash = () => {
  const imgsrc = imgtest
  console.log(imgsrc);
  return (
    <div className='MainDash'>
        <h1>나의 음주 관리</h1>
        <DataCheck />
        <img src={'./static/media/soju.2a50e17a320caaa79052.jpg'} alt="" />
    </div>
  )
}

export default MainDash