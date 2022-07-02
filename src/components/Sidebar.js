import React from 'react';
import {VscHome} from 'react-icons/vsc';
import {MdOutlineVideoLibrary} from 'react-icons/md';
import {AiOutlineLike} from 'react-icons/ai';

const Sidebar = () => {
  return (
    <div className='sidebar-container'>
        <div className='sidebar-item-container'>
            <div className='sidebar-icon'>
                <VscHome/>
            </div>
            <div className='sidebar-item-title'>
                Home
            </div>
        </div>
        <div className='sidebar-item-container'>
            <div className='sidebar-icon'>
                <MdOutlineVideoLibrary/> 
            </div>
            <div className='sidebar-item-title'>
                Your Videos
            </div>
        </div>
        <div className='sidebar-item-container'>
            <div className='sidebar-icon'>
                <AiOutlineLike/> 
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