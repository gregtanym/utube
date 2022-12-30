import React, { useEffect } from 'react';
import {VscHome} from 'react-icons/vsc';
import {MdOutlineVideoLibrary} from 'react-icons/md';
import { Link } from 'react-router-dom';
import {AiOutlineLike} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context'

const Sidebar = () => {
    const {searchTerm, setSearchTerm, fetchFilteredVideos, searchValue, isHomeClicked, setIsHomeClicked} = useGlobalContext()
    const navigate = useNavigate()

    const onclick = () =>{
        setSearchTerm('')
        searchValue.current.value = ''
        // ishomeclicked is just a switch to trigger fetchfilteredvideos. the boolean value does not matter coz i am only looking out of its change of state
        setIsHomeClicked(!isHomeClicked)
    }

    useEffect(()=>{
        fetchFilteredVideos()
    }, [isHomeClicked])

  return (
    <div className='sidebar-container'>
        <Link to='/' style={{textDecoration: 'none', width: '100%', color: 'white'}} onClick={onclick}>
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