import React, { useContext, useEffect, useState, useRef } from "react"

const AppContext = React.createContext()

const AppProvider = (({children}) => {
    const searchValue = useRef('')

    const [videos, setVideos] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const [quicksearch, setQuicksearch] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [uploadedVideo, setUploadedVideo] = useState([])
    const [singleVideoDetails, setSingleVideoDetails] = useState([])
    const [isHomeClicked, setIsHomeClicked] = useState(false)
    const [sidebarStatus, setSidebarStatus] = useState(false)
    const [initialSidebarState, setInitialSidebarState] = useState(false)

    // for getting all videos 
    const fetchAllVideos = async () => {
        console.log('fetchAllVideos called')
        const response = await fetch('http://127.0.0.1:8000/utube/video/list')
        const data =  await response.json()
        if(data){
            const newVideos = data.map((video) => {
                const {id,title,file,thumbnail, views, create_at} = video
                return {
                    id: id,
                    title: title,
                    thumbnail: thumbnail,
                    video: file,
                    views: views,
                    create_at: create_at
                }
            })
            setVideos(newVideos)
        }
        else{
            setVideos([])
        }
    }

    // useEffect(() => {
    //     fetchAllVideos();
    //     // console.log(videos)
    // },[])



    // for filtering videos based on search input 
    const fetchVideoTitles = async () => {
        console.log('fetchVideoTitles called')
        const response = await fetch(
            'http://127.0.0.1:8000/utube/video/list', {
                method: 'POST',
                body: JSON.stringify({
                    title: searchTerm
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
    // useEffect(() => {
    //     fetchVideoTitles();
    //     searchTerm ? setShowDropdown(true) : setShowDropdown(false)
    //     // Quicksearch should be a list of titles at this point
    // },[searchTerm])



    // get final search results
    const fetchFilteredVideos = async () => {
        console.log('fetchFilteredVideos called')
        console.log("THIS IS SEARCH TERM: ", searchTerm)
        const response = await fetch(
            'http://127.0.0.1:8000/utube/video/list', {
                method: 'POST',
                body: JSON.stringify({
                    title: searchTerm
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }   
        )
        const data =  await response.json()
        if(data){
            const filteredVideos = data.map((video) => {
                const {id,title,file,thumbnail, views, create_at} = video
                return {
                    id: id,
                    title: title,
                    thumbnail: thumbnail,
                    video: file,
                    views: views,
                    create_at: create_at
                }
            })
            setVideos(filteredVideos)
        }
        else{
            setVideos([])
        }
    }

    const fetchSingleVideo = async (id) => {
        try {
            console.log('fetchSingleVideo called')
            const response = await fetch(`http://127.0.0.1:8000/utube/video/${id}`)
            const data =  await response.json()
            if(data){
                setSingleVideoDetails(data)
            }
            else{
                console.log('data not found')
                setSingleVideoDetails({})
            }
        }
        catch(error){
            alert(error)
        }
    }

    // toggle sidebar, triggers change for initial sidebar state from false to true and then does not change initial state again (to prevent slide out animation on page load)
    const toggleSidebar = () => {
        setSidebarStatus(!sidebarStatus)

        if(!initialSidebarState) {
            setInitialSidebarState(true)
        } 
    }

    return(
        <AppContext.Provider value={
            {
                videos, quicksearch, searchTerm, showDropdown, uploadedVideo, singleVideoDetails, isHomeClicked, searchValue, sidebarStatus, initialSidebarState,
                setVideos, setQuicksearch, setSearchTerm, setShowDropdown, setUploadedVideo, setSingleVideoDetails, setIsHomeClicked, setSidebarStatus, setInitialSidebarState,
                fetchAllVideos, fetchVideoTitles, fetchSingleVideo, fetchFilteredVideos, toggleSidebar,
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