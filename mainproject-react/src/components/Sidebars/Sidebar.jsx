import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../imgs/logo.png'
import './Sidebar.css'


import { SidebarData } from '../../data/Data';
import { UilSignOutAlt, UilBars } from '@iconscout/react-unicons';
import { useState } from 'react';

import { motion } from 'framer-motion'

const Sidebar = () => {

    const [selected, setSelected] = useState(0);
    const [expanded, setExpanded] = useState(true);

    const sidebarVarients = {
        true: {
            left: '0',
        },
        false: {
            left: '-60%',
        }
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
                {/* 우리 로고 들어갈 자리! */}
                
                    <div className='logo'>
                        <Link to="/Main" >
                        <img className='logoimg' src={Logo} alt="" />
                        </Link>
                        <span>
                            호<span>온옴</span>술
                        </span>
                    </div>
                

                {/* 사이드바 메뉴 */}
                <div className="menu">

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
                    <div className="menuItem">
                        <UilSignOutAlt />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Sidebar