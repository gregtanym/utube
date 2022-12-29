import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context'


const Feed = () => {
    const {videos, setVideos, fetchAllVideos} = useGlobalContext()

    useEffect(() => {
        fetchAllVideos();
    },[])
    console.log(videos)
    return (
        <div className='feed-container'>
            {videos.map((video) => {
                return(
                    <div className='feed-video-card' key={video.id}>
                        <div className='feed-video-card-inner'>
                            <img className='feed-thumbnail' src={`http://127.0.0.1:8000${video.thumbnail}`}/>
                            {/* <div className="embed-responsive embed-responsive-16by4">
                                <iframe className="embed-responsive-item" src={`http://127.0.0.1:8000${video.video}`} allowFullScreen></iframe>
                            </div> */}
                            <div className='feed-video-card-title'>{video.title}</div>
                            <div className='feed-video-card-views-container'>
                                <div>{video.views} views</div>
                                <div>{video.create_at}</div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Feed