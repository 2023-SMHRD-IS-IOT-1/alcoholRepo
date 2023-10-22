import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../imgs/logo.png'
import './Sidebar.css'


import { SidebarData } from '../../data/Data';
import { UilSignOutAlt, UilBars } from '@iconscout/react-unicons';
import { useState } from 'react';

import { Userinfo } from '../../data/Data';
import donotSticker from '../../data/donotAlcohol.png';
import fullSticker from '../../data/fullAlcohol.png';
import pushSticker from '../../data/pushAlcohol.png';
import soakSticker from '../../data/soakAlcohol.png';
import princessSticker from '../../data/princessAlcohol.png';
import needSticker from '../../data/needAlcohol.png';
import onemoreSticker from '../../data/onemoreAlcohol.png';
import waveSticker from '../../data/waveAlcohol.png';
import bottleSticker from '../../data/bottleAlcohol.png';

import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const [selected, setSelected] = useState(0);
    const [expanded, setExpanded] = useState(true);
    const images = {
        donotSticker, fullSticker, pushSticker, soakSticker,
        princessSticker, needSticker, onemoreSticker, waveSticker, bottleSticker
    };

    const navigate = useNavigate();

    const [proimg, setProimg] = useState(images[Userinfo[0].u_img]);
    useEffect(() => {
        setProimg(images[Userinfo[0].u_img])
    }, [Userinfo[0].u_img]);

    const sidebarVarients = {
        true: {
            left: '0',
        },
        false: {
            left: '-60%',
        }
    }

    const logout = () => {
        navigate('./')
        alert('로그아웃 되었습니다!')
    }



    return (
        <div>
            <div
                className='bars'
                style={expanded ? { left: '60%' } : { left: '5%' }}
                onClick={() => setExpanded(!expanded)}
            >
                <UilBars />
            </div>
            <motion.div className='Sidebar'
                variants={sidebarVarients}
                animate={window.innerWidth <= 768 ? `${expanded}` : ''}
            >
                {/* 사이드바 메뉴 */}
                <div className="menu">
                    <div className='logo'>
                        <Link to="/Main" >
                            <img className='logoimg' src={Logo} alt="" />
                        </Link>
                        {/* <span className='logoname'>
                            호<span>온옴</span>술
                        </span> */}
                        <div className='profilebox'>
                            <img className='proimg' src={proimg} alt="프로필 이미지"></img>
                            <span className='proname'><p><span className='pronick'>{Userinfo[0].u_nickname}</span><span>님</span></p>환영합니다!</span>
                        </div>
                    </div>
                    {SidebarData.map((item, index) => {
                        return (
                            <div className={selected === index ? 'menuItem active' : 'menuItem'}
                                key={index}
                                onClick={() => setSelected(index)}
                            >
                                <NavLink
                                    to={`/${item.heading}`}
                                >
                                    <item.icon />
                                    <span>
                                        {item.heading}
                                    </span>
                                </NavLink>
                            </div>
                        )
                    })}
                    <div className="menuItem" onClick={logout}>
                        <UilSignOutAlt />
                        <span>
                            LogOut
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Sidebar