import React from 'react'
import { useState } from 'react'
import './Card.css'

import { motion, AnimateSharedLayout } from 'framer-motion'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { CardsData } from '../../data/Data';

// 그래프 도구
import Chart from 'react-apexcharts'

import { UilTimes } from '@iconscout/react-unicons'

const Card = (props) => {
    const [expanded, setExpanded] = useState(false)
    return (
        <AnimateSharedLayout>
            {
                expanded ?
                    <ExpandedCard param={props} setExpanded={() => setExpanded(false)} /> :
                    <CompactCard param={props} setExpanded={() => setExpanded(true)} />

            }
        </AnimateSharedLayout>
    )
}

// CompactCard
function CompactCard({ param, setExpanded }) {
    const Png = param.png;
    return (
        <motion.div
            className="CompactCard"
            style={{
                background: param.color.backGround,
                boxShadow: param.color.boxShadow
            }}
            onClick={setExpanded}
            layoutId='expandableCard'
        >
            <div className="radialBar">
                <CircularProgressbar
                    value={param.barValue}
                    text={`${param.barValue}%`}
                />
                <span>{param.title}</span>
            </div>
            <div className="detail">
                <Png />
                <span>{param.value}</span>
                <span>Last 24 hours</span>
            </div>
        </motion.div>
    )
}


// 1. 정보를 받아오고 
// 2. 배열에 push 
// data.option.xaxis.categories.push()

// ==============
// 검색 ... <- 스프레드 문법 
// 내가 바꿀거 빼고 나머지는 그대로 둘게 

// data 
// a : 20 
// b : 10 

// ...data, a = 10 
// ==> a:10 b : 10 



function generateDateRange(days) {
    const dateRange = [];
    const today = new Date();

    for (let i = days; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dateRange.push(date.toISOString().split('T')[0]);
    }

    return dateRange;
}


// 23, 10, 11 <- 23-10-11 
// ExpandedCard
function ExpandedCard({ param, setExpanded }) {

    const data = {
        options: {
            chart: {
                type: "area",
                height: "auto",
            },
            dropShadow: {
                enabled: false,
                enabledOnmSeries: undefined,
                top: 0,
                left: 0,
                blur: 3,
                color: "#000",
                opacity: 0.35,
            },
            fill: {
                colors: ["#fff"],
                type: "gradient",
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
                colors: ["white"],
            },
            tooltip: {
                x: {
                    format: "dd/MM/yy HH:mm",
                },
            },
            grid: {
                show: true,
            },
            xaxis: {
                type: "datetime",
                categories: [
                    generateDateRange(30),
                ]
            }
        },

    }

    
    return (
        <motion.div
            className="ExpandedCard"
            style={{
                background: param.color.backGround,
                boxShadow: param.color.boxShadow,
            }}
            layoutId='expandableCard'
        >
            <div style={{ alignSelf: 'flex-end', cursor: 'pointer', color: 'white' }}>
                <UilTimes onClick={setExpanded} />
            </div>
            <span>{param.title}</span>
            <div className="chartContainer">
                <Chart series={param.series} type='area' options={data.options} />
            </div>
            <span>Last 24 hours</span>
        </motion.div>
    )
}

export default Card