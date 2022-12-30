import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai'
import { FaMicrophone } from 'react-icons/fa';
import { useGlobalContext } from '../context'

const Searchbar = () => {
    const {searchTerm, setSearchTerm, showDropdown, setShowDropdown, quicksearch, fetchFilteredVideos, fetchVideoTitles, searchValue} = useGlobalContext()
    const navigate = useNavigate()

    const quickSearchVideos = () => {
        setSearchTerm(searchValue.current.value)
    }

    const handleSubmit = (e) => {
        if (searchTerm !== ''){
            navigate('/')
            fetchFilteredVideos()
            setShowDropdown(false)
            e.preventDefault()
        }
        else{
            navigate('/')
            fetchFilteredVideos()
            e.preventDefault()
        }
    }

    useEffect(() => {
        fetchVideoTitles();
        searchTerm ? setShowDropdown(true) : setShowDropdown(false)
        // Quicksearch should be a list of titles at this point
    },[searchTerm])

    return (
        <div className='searchbar'>
            <form className='searchbar-form-styling' onSubmit={handleSubmit}>
                <div className='search-dropdown'>
                    <input className='searchbar-input' type="search" placeholder="Search"  
                    ref={searchValue} onChange={quickSearchVideos}/>
                    {showDropdown && 
                    <div className='dropdown-selection'>
                        {quicksearch.map((result) => {
                            // selecting title on the dropdown is supposed to take u to the specific single video page which is not done yet
                            return(<a href='#' key={result.id}><div style={{width: '100%'}}>{result.title}</div></a>)
                        })}
                    </div>
                    }
                </div>
                {/* upon submitting the form ur page is supposed to filter all the possible videos matching your search results*/}
                <button className='searchbar-submit' type="submit"><AiOutlineSearch size={25} /></button>
                <FaMicrophone color='white' size={20}/>
            </form>
        </div>
    )
}

export default Searchbar