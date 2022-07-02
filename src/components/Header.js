import React from 'react';
import Searchbar from './Searchbar';
import { AiOutlineMenu, AiFillYoutube } from 'react-icons/ai';
import { RiVideoUploadLine, RiAccountCircleFill } from 'react-icons/ri';
import { IoMdNotificationsOutline } from 'react-icons/io';


const Header = () => {
  return (
    <div className='header-container'>
        <div className='header-container-left'>
            <AiOutlineMenu color='white' size={25}/>
            <AiFillYoutube color='red' size={25}/>
        </div>

        <div className='header-container-center'>
            <Searchbar/>
            
        </div>

        <div className='header-container-right'>
            <RiVideoUploadLine color='white' size={25}/>
            <IoMdNotificationsOutline color='white' size={25}/>
            <RiAccountCircleFill color='white' size={25}/>
        </div>
    </div>
  )
}

export default Header