// Sidebar imports
// 아이콘 목록은
// https://www.npmjs.com/package/@iconscout/react-unicons?activeTab=code

import {
    UilEstate,
    UilCalendarAlt,
    UilChart,
    UilUsersAlt,
    // UilSignOutAlt,
    UilClock,
} from "@iconscout/react-unicons";


// Sidebar Data
export const SidebarData = [
    {
        icon: UilEstate,
        heading: "Main",
    },
    {
        icon: UilCalendarAlt ,
        heading: "Calendar",
    },
    {
        icon: UilChart,
        heading: "Analytics",
    },
    {
        icon: UilUsersAlt,
        heading: "Customers",
    },
    
]

export const Userinfo = [
]

export const UserData = [
];

// 카드에 표시할 데이터
export const CardsData = [
    {
        title : "음주량",
        color : {
            backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        barValue: 70,
        value: "25,970",
        png: UilClock,
        series: [
            {
                name: "음주량",
                data:[31, 40, 28, 51, 42, 109, 100, 200, 30, 50],
            },
        ],
    },
    {
        title : "음주시간",
        color : {
            backGround: "linear-gradient(180deg, #FF919D 0%, #Fc929D 100%)",
            boxShadow: "0px 10px 20px 0px #FDC0C7",
        },
        barValue: 80,
        value: "14,270",
        png: UilClock,
        series: [
            {
                name: "음주시간",
                data:[10, 100, 50, 70, 80, 30, 40],
            },
        ],
    },
    {
        title : "음주속도",
        color : {
            backGround: "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
            boxShadow: "0px 10px 20px 0px #F9D59B",
        },
        barValue: 60,
        value: "4,270",
        png: UilClock,
        series: [
            {
                name: "음주속도",
                data:[31, 40, 28, 51, 42, 109, 100],
            },
        ],
    },
]