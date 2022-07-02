import React, { useContext, useEffect, useState } from "react"

const AppContext = React.createContext()

const AppProvider = (({children}) => {
    const [videos, setVideos] = useState([])
    const [quicksearch, setQuicksearch] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    // for getting all videos 
    const fetchAllVideos = async () => {
        console.log('fetchAllVideos called')
        const response = await fetch('http://127.0.0.1:8000/utube/video/list')
        const data =  await response.json()
        if(data){
            const newVideos = data.map((video) => {
                const {id,title,file} = video
                return {
                    id: id,
                    title: title,
                    video: file
                }
            })
            setVideos(newVideos)
        }
        else{
            setVideos([])
        }
    }

    useEffect(() => {
        fetchAllVideos();
        console.log(videos)
    },[])

    // for filtering videos based on search input 
    const fetchVideoTitles = async () => {
        console.log('fetchVideoTitles called')
        const response = await fetch(
            'http://127.0.0.1:8000/utube/video/list', {
                method: 'POST',
                body: JSON.stringify({
                    title: {searchTerm}
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        )
        const data =  await response.json()
        if(data){
            const searchReults = data.map((finding) => {
                const {id,title} = finding
                return {
                    id: id,
                    title: title,
                }
            })
            setQuicksearch(searchReults)
        }
        else{
            setQuicksearch([])
        }
    }
    useEffect(() => {
        fetchVideoTitles();
        // Quicksearch should be a list of titles at this point
    },[searchTerm])

    // get final search results
    const fetchFilteredVideos = async () => {
        console.log('fetchFilteredVideos called')
        const response = await fetch(
            'http://127.0.0.1:8000/utube/video/list', {
                method: 'POST',
                body: JSON.stringify({
                    title: {searchTerm}
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        )
        const data =  await response.json()
        if(data){
            const filteredVideos = data.map((video) => {
                const {id,title,file} = video
                return {
                    id: id,
                    title: title,
                    video: file
                }
            })
            setVideos(filteredVideos)
        }
        else{
            setVideos([])
        }
    }

    return(
        <AppContext.Provider value={
            {
                videos, quicksearch,
                setVideos, setSearchTerm, fetchFilteredVideos
            }
        }>
            {children}
        </AppContext.Provider>
    )
})

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }