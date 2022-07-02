import React, { useRef } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import { useGlobalContext } from '../context'

const Searchbar = () => {
    const searchValue = useRef('')
    const {searchTerm, setSearchTerm, fetchFilteredVideos} = useGlobalContext()

    const quickSearchVideos = () => {
        setSearchTerm(searchValue.current.value)
        console.log(searchTerm)
    }
    return (
        <div className='searchbar'>
            <form>
                <input className='searchbar-input' type="search" placeholder="Search" aria-label="Search" ref={searchValue} onChange={quickSearchVideos}/>
                <button className='searchbar-submit' type="submit"><AiOutlineSearch/></button>
            </form>
        </div>
    )
}

export default Searchbar