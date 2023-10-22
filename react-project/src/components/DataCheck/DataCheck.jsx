import React, { useEffect } from 'react'
import { Userinfo, UserData, UserDataAnalystic, CardsData } from '../../data/Data'
import axios from '../../axios';

import {
    // UilEstate,
    // UilCalendarAlt,
    // UilChart,
    // UilUsersAlt,
    // UilSignOutAlt,
    UilClock,
} from "@iconscout/react-unicons";

function generateDateRange(days) {
    const dateRange = [];
    const today = new Date();

    for (let i = days; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
        const day = date.getDate();

        // 월과 일을 한 자리로 표현하기 위해 문자열로 조합
        const dateString = `${year}-${month}-${day}`;

        dateRange.push(dateString);
    }

    return dateRange;
}


const DataCheck = () => {
    console.log("DataCheck 실행")
    const dateRange = generateDateRange(29);
    console.log(dateRange);
    useEffect(() => {
        console.log('처음실행');

        axios.get('/user/getAlcoholData')
            .then(res => {
                const date1 = new Date(res.data.data[0].end_time);
                const date2 = new Date(res.data.data[0].start_time);
                console.log("데이터오나?", res.data.data.length);
                for (let i = 0; i < 30; i++) {
                    let pushcheck = 0

                    for (let j = 0; j < res.data.data.length; j++) {

                        const dateTimeString = res.data.data[j].start_time;
                        const date = new Date(dateTimeString);
                        const year = date.getFullYear();
                        const month = date.getMonth() + 1; // 월 정보는 0부터 시작하므로 +1
                        const day = date.getDate();
                        const date1 = new Date(res.data.data[j].end_time);
                        const date2 = new Date(res.data.data[j].start_time);
                        const drink_minute = Math.ceil((date1 - date2) / (1000 * 60));
                        const drink_speed = Math.ceil(res.data.data[j].soju_ml / (drink_minute / 60) * 100) / 100;

                        const formattedDate = `${year}-${month}-${day}`;

                        if (dateRange[i] === formattedDate) {
                            pushcheck = 1
                            UserData[i] = {
                                date: dateRange[i],
                                soju_ml: res.data.data[j].soju_ml,
                                beer_ml: res.data.data[j].beer_ml,
                                drink_time: drink_minute,
                                drink_speed: drink_speed,
                            }
                        }
                    }
                    if (pushcheck === 0) {
                        UserData[i] = {
                            date: dateRange[i],
                            soju_ml: 0,
                            beer_ml: 0,
                            drink_time: 0,
                            drink_speed: 0,
                        }
                    } else {
                        pushcheck = 0
                    }
                }
                console.log("데이터저장됐나?", UserData);

                let barValue = 0;
                let sum = 0;
                let value = 0;
                let barValueAdd = 0;
                let sumAdd = 0;
                let valueAdd = 0;
                let seriesdata = [];
                let seriesput = [];
                let card_alcohol;
                card_alcohol = {
                    title: "음주량",
                    color: {
                        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
                        boxShadow: "0px 10px 20px 0px #e0c6f5",
                    },
                    png: UilClock,
                }
                for (let i = 23; i < 30; i++) {
                    sum += UserData[i].soju_ml;
                }
                value = Math.ceil(sum / 360 * 100) / 100 + "병"
                barValue = Math.ceil(sum / Userinfo[0].u_maxalcohol * 100 * 100) / 100
                for (let i = 0; i < 30; i++) {
                    sumAdd += UserData[i].soju_ml;
                }
                valueAdd = Math.ceil(sumAdd / 360 * 100) / 100 + "병"
                barValueAdd = Math.ceil(sumAdd / (Userinfo[0].u_maxalcohol/7*30) * 100 * 100) / 100
                for (let j = 0; j < 30; j++) {
                    seriesdata.push(UserData[j].soju_ml);
                }
                seriesput.push({ name: "음주량", data: seriesdata });
                card_alcohol.barValue = barValue
                card_alcohol.value = value
                card_alcohol.series = seriesput
                card_alcohol.barValueAdd = barValueAdd
                card_alcohol.valueAdd = valueAdd
                // CardsData.push(card_alcohol);
                CardsData[0] = card_alcohol;

                barValue = 0;
                sum = 0;
                value = 0;
                barValueAdd = 0;
                sumAdd = 0;
                valueAdd = 0;
                seriesdata = [];
                seriesput = [];
                let card_alcoholtime;
                card_alcoholtime = {
                    title: "음주시간",
                    color: {
                        backGround: "linear-gradient(180deg, #FF919D 0%, #Fc929D 100%)",
                        boxShadow: "0px 10px 20px 0px #FDC0C7",
                    },
                    png: UilClock,
                }
                for (let i = 23; i < 30; i++) {
                    sum += UserData[i].drink_time;
                }
                value = Math.ceil(sum / 60 * 100) / 100 + "h"
                barValue = Math.ceil((sum / Userinfo[0].u_maxtime) * 100 * 100) / 100
                for (let i = 0; i < 30; i++) {
                    sumAdd += UserData[i].drink_time;
                }
                valueAdd = Math.ceil(sumAdd / 60 * 100) / 100 + "h"
                barValueAdd = Math.ceil((sumAdd / (Userinfo[0].u_maxtime/7*30)) * 100 * 100) / 100
                for (let j = 0; j < 30; j++) {
                    seriesdata.push(UserData[j].drink_time);
                }
                seriesput.push({ name: "음주시간", data: seriesdata });
                card_alcoholtime.barValue = barValue
                card_alcoholtime.value = value
                card_alcoholtime.series = seriesput
                card_alcoholtime.barValueAdd = barValueAdd
                card_alcoholtime.valueAdd = valueAdd
                // CardsData.push(card_alcoholtime);
                CardsData[1] = card_alcoholtime;

                barValue = 0;
                sum = 0;
                value = 0;
                barValueAdd = 0;
                sumAdd = 0;
                valueAdd = 0;
                seriesdata = [];
                seriesput = [];
                let card_alcoholspeed;
                card_alcoholspeed = {
                    title: "음주속도",
                    color: {
                        backGround: "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
                        boxShadow: "0px 10px 20px 0px #F9D59B",
                    },
                    png: UilClock,
                }
                for (let i = 23; i < 30; i++) {
                    sum += UserData[i].drink_speed;
                }
                value = Math.ceil(CardsData[0].value.replace('병', '') * 360 / CardsData[1].value.replace('h', '') * 100) / 100 + "ml/h";
                barValue = Math.ceil(value.replace('ml/h', '') / ((Userinfo[0].u_maxalcohol) / (Userinfo[0].u_maxtime / 60)) * 100 * 100) / 100
                for (let i = 0; i < 30; i++) {
                    sumAdd += UserData[i].drink_speed;
                }
                valueAdd = Math.ceil(CardsData[0].valueAdd.replace('병', '') * 360 / CardsData[1].valueAdd.replace('h', '') * 100) / 100 + "ml/h";
                barValueAdd = Math.ceil(valueAdd.replace('ml/h', '') / ((Userinfo[0].u_maxalcohol) / (Userinfo[0].u_maxtime / 60)) * 100 * 100) / 100
                for (let j = 0; j < 30; j++) {
                    seriesdata.push(UserData[j].drink_speed);
                }
                seriesput.push({ name: "음주속도", data: seriesdata });
                card_alcoholspeed.barValue = barValue
                card_alcoholspeed.value = value
                card_alcoholspeed.series = seriesput
                card_alcoholspeed.barValueAdd = barValueAdd
                card_alcoholspeed.valueAdd = valueAdd
                // CardsData.push(card_alcoholspeed);
                CardsData[2] = card_alcoholspeed;

                barValue = 0;
                sum = 0;
                value = 0;
                barValueAdd = 0;
                sumAdd = 0;
                valueAdd = 0;
                seriesdata = [];
                seriesput = [];


                console.log("카드데이터", CardsData);

                // UserData = [];
                console.log("유저데이터", UserData);
            })
            .catch(e => console.log("에러 :", e));



    }, []);

    return (
        <div></div>
    )
}

export default DataCheck