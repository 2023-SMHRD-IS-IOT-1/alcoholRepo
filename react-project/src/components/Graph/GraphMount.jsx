import React, { useEffect } from 'react'
import { CardsData } from '../../data/Data'
import axios from '../../axios';

import {
    // UilEstate,
    // UilCalendarAlt,
    // UilChart,
    // UilUsersAlt,
    // UilSignOutAlt,
    UilClock,
} from "@iconscout/react-unicons";

const GraphMount = () => {


    useEffect(() => {
        console.log('처음실행');
        axios.get('/user/getA')
            .then(res => {
                console.log("데이터오나?", res.data.data);

                let cardItem;
                
                if (CardsData.length !== 3) {
                    console.log("if되나?")
                    for (let i = 0; i < 3; i++) {
                        cardItem = {
                            title: "우리 무게",
                            color: {
                                backGround: "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
                                boxShadow: "0px 10px 20px 0px #F9D59B",
                            },
                            png: UilClock,
                        }
                        let alcholmean=0;
                        let alcholsum=0;
                        let seriesput = [];
                        let seriesItem;
                        let seriesdata = [];
                        for (let j = 0; j < res.data.data.length; j++) {
                            seriesItem = res.data.data[j].al_ml
                            alcholsum += res.data.data[j].al_ml
                            seriesdata.push(seriesItem);
                        }
                        seriesput.push({name: "무게", data:seriesdata});
                        alcholmean = alcholsum/700
                        cardItem.series = seriesput
                        cardItem.barValue = alcholmean
                        cardItem.value = alcholsum
                        
                    }

                    // cardItem = { first: res.data.data[i].al_ml, second: res.data.data[i].cr_at }
                    CardsData.push(cardItem);
                }
                console.log("데이터저장됐나?", CardsData);
            })
            .catch(e => console.log("에러 :", e));
    }, []);


return (
    <div>GraphMount</div>
)
}

export default GraphMount