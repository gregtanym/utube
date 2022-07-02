import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context'


const Feed = () => {
    const {videos, setVideos} = useGlobalContext()
    return (
        <div>
            {videos.map((video) => {
                return(
                    <div key={video.id}>
                        <div>{video.title}</div>
                        {/* <div className="embed-responsive embed-responsive-16by9">
                            <iframe className="embed-responsive-item" src={video.video} allowFullScreen></iframe>
                        </div> */}
                    </div>
                )
            })}
        </div>
    )
}

export default Feed