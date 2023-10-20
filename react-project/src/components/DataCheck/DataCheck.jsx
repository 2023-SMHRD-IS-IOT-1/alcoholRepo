import React, { useEffect } from 'react'
import { Userinfo, CardsData } from '../../data/Data'
import axios from '../../axios';

import {
    // UilEstate,
    // UilCalendarAlt,
    // UilChart,
    // UilUsersAlt,
    // UilSignOutAlt,
    UilClock,
} from "@iconscout/react-unicons";

const DataCheck = () => {

    useEffect(() => {
        console.log('처음실행');
        if (CardsData.length === 0) {
            axios.get('/user/getAlcohol')
                .then(res => {
                    console.log("데이터오나?", res.data.data);

                    let cardItem;

                    console.log("if되나?")
                    // for (let i = 0; i < 3; i++) {
                    cardItem = {
                        title: "음주량",
                        color: {
                            backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
                            boxShadow: "0px 10px 20px 0px #e0c6f5",
                        },
                        png: UilClock,
                    }
                    let alcholmean = 0;
                    let alcholsum = 0;
                    let seriesput = [];
                    let seriesItem;
                    let seriesdata = [];
                    for (let j = 0; j < res.data.data.length; j++) {
                        seriesItem = res.data.data[j].soju_ml
                        alcholsum += res.data.data[j].soju_ml
                        seriesdata.push(seriesItem);
                    }
                    seriesput.push({ name: "음주량", data: seriesdata });
                    alcholmean = alcholsum / 700
                    cardItem.series = seriesput
                    cardItem.barValue = alcholmean
                    cardItem.value = alcholsum

                    // }

                    // cardItem = { first: res.data.data[i].al_ml, second: res.data.data[i].cr_at }
                    CardsData.push(cardItem);

                    console.log("데이터저장됐나?", CardsData);
                })
                .catch(e => console.log("에러 :", e));
            axios.get('/user/getAlcoholTime')
                .then(res => {
                    console.log("데이터오나?", res.data.data);

                    let cardItem;

                    console.log("if되나?")
                    // for (let i = 0; i < 3; i++) {
                    cardItem = {
                        title: "음주시간",
                        color: {
                            backGround: "linear-gradient(180deg, #FF919D 0%, #Fc929D 100%)",
                            boxShadow: "0px 10px 20px 0px #FDC0C7",
                        },
                        png: UilClock,
                    }
                    let alcholmean = 0;
                    let alcholsum = 0;
                    let seriesput = [];
                    let seriesItem;
                    let seriesdata = [];
                    for (let j = 0; j < res.data.data.length; j++) {
                        seriesItem = res.data.data[j].al_ml
                        alcholsum += res.data.data[j].al_ml
                        seriesdata.push(seriesItem);
                    }
                    seriesput.push({ name: "음주시간", data: seriesdata });
                    alcholmean = alcholsum / 700
                    cardItem.series = seriesput
                    cardItem.barValue = alcholmean
                    cardItem.value = alcholsum

                    // }

                    // cardItem = { first: res.data.data[i].al_ml, second: res.data.data[i].cr_at }
                    CardsData.push(cardItem);

                    console.log("데이터저장됐나?", CardsData);
                })
                .catch(e => console.log("에러 :", e));
            axios.get('/user/getAlcoholSpeed')
                .then(res => {
                    console.log("데이터오나?", res.data.data);

                    let cardItem;


                    console.log("if되나?")
                    // for (let i = 0; i < 3; i++) {
                    cardItem = {
                        title: "음주속도",
                        color: {
                            backGround: "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
                            boxShadow: "0px 10px 20px 0px #F9D59B",
                        },
                        png: UilClock,
                    }
                    let alcholmean = 0;
                    let alcholsum = 0;
                    let seriesput = [];
                    let seriesItem;
                    let seriesdata = [];
                    for (let j = 0; j < res.data.data.length; j++) {
                        seriesItem = res.data.data[j].al_ml
                        alcholsum += res.data.data[j].al_ml
                        seriesdata.push(seriesItem);
                    }
                    seriesput.push({ name: "음주속도", data: seriesdata });
                    alcholmean = alcholsum / 700
                    cardItem.series = seriesput
                    cardItem.barValue = alcholmean
                    cardItem.value = alcholsum

                    // }

                    // cardItem = { first: res.data.data[i].al_ml, second: res.data.data[i].cr_at }
                    CardsData.push(cardItem);

                    console.log("데이터저장됐나?", CardsData);
                })
                .catch(e => console.log("에러 :", e));
        }
    }, []);

    return (
        <div>DataCheck</div>
    )
}

export default DataCheck