import React from 'react';
import {VscHome} from 'react-icons/vsc';
import {MdOutlineVideoLibrary} from 'react-icons/md';
import { Link } from 'react-router-dom';
import {AiOutlineLike} from 'react-icons/ai';

const Sidebar = () => {
  return (
    <div className='sidebar-container'>
        <Link to='/' style={{textDecoration: 'none', width: '100%', color: 'white'}}>
            <div className='sidebar-item-container'>
                <div className='sidebar-icon'>
                    <VscHome size={25}/>
                </div>
                <div className='sidebar-item-title'>
                    Home
                </div>
            </div>
        </Link>
        <div className='sidebar-item-container'>
            <div className='sidebar-icon'>
                <MdOutlineVideoLibrary size={25}/> 
            </div>
            <div className='sidebar-item-title'>
                Your Videos
            </div>
        </div>
        <div className='sidebar-item-container'>
            <div className='sidebar-icon'>
                <AiOutlineLike size={25}/> 
            </div>
            <div className='sidebar-item-title'>
                Liked Videos
            </div>
        </div>
        <div className='sidebar-item-container'>
            Subscriptions
        </div>
    </div>
  )
}

export default Sidebar