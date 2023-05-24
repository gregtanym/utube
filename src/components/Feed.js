import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context'
import { Link, useNavigate} from 'react-router-dom';
import HoverVideoPlayer from 'react-hover-video-player';

export const get_time_diff = (earlier_time) => {
    const current_date = new Date()
    if ((current_date.getFullYear() - earlier_time.getFullYear())>0){
        return <div>{current_date.getFullYear() - earlier_time.getFullYear()} years ago</div>
    }
    else if(((current_date.getMonth()) - (earlier_time.getMonth())) > 0){
        return <div>{(current_date.getMonth()) - (earlier_time.getMonth())} months ago</div>
    }
    else if((current_date.getDate() - earlier_time.getDate()) > 0){
        return <div>{current_date.getDate() - earlier_time.getDate()} days ago</div>
    }
    else{
        return <div>Less than a day ago</div>
    }
}

const Feed = () => {
    const {videos, setVideos, fetchAllVideos, fetchFilteredVideos} = useGlobalContext()
    

    useEffect(() => {
        fetchFilteredVideos()
    },[])
    // console.log(videos)
    return (
        <div className='feed-container'>

            {videos.map((video) => {
                const created_date = new Date(video.create_at)
                return(
                    <div className='feed-video-card' key={video.id}>
                        <Link to={`/${video.id}`} style={{textDecoration: 'none', width: '100%', color: 'white', position:'relative'}}>
                            <div className='feed-video-card-inner'>
                                <HoverVideoPlayer
                                videoClassName='feed-thumbnail-video'
                                videoSrc={`http://127.0.0.1:8000${video.video}`}
                                playbackStartDelay={500}
                                pausedOverlay={
                                    <img
                                        className='feed-thumbnail'
                                        src={`http://127.0.0.1:8000${video.thumbnail}`}
                                    />
                                }
                                loadingOverlay={
                                    <div className='loading-overlay'>
                                        <div className='loading-spinner'/>
                                    </div>
                                }
                                />
                                <div className='feed-video-card-title'>{video.title}</div>
                                <div className='feed-video-card-views-container'>
                                    <div>{video.views} views</div>
                                    {get_time_diff(created_date)}
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default Feed