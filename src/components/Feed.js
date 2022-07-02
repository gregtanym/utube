import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context'


const Feed = () => {
    const {videos, setVideos} = useGlobalContext()
    return (
        <div className='feed-container'>
            {videos.map((video) => {
                return(
                    <div key={video.id}>
                        <div>{video.title}</div>
                        {/* in this case, getting the video source does not include the fact that it is from my backend link, so i have to manually add that myself in the video source */}
                        <div className="embed-responsive embed-responsive-16by9">
                            <iframe className="embed-responsive-item" src={`http://127.0.0.1:8000${video.video}`} allowFullScreen></iframe>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Feed