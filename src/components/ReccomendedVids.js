import React, { useEffect, useState } from 'react'
import { get_time_diff } from './Feed'
import { useGlobalContext } from '../context'
import { Link, useNavigate, useParams } from 'react-router-dom';
import HoverVideoPlayer from 'react-hover-video-player';

const ReccomendedVids = () => {
    const {videos, setVideos, fetchAllVideos} = useGlobalContext()
    
    // console.log(id);
    useEffect(() => {
        fetchAllVideos();
    },[])

  return (
    <div className='recco-container'>
            {videos.map((video) => {
                const created_date = new Date(video.create_at)
                return(
                    <div className='recco-video-card' key={video.id}>
                        <div className='recco-video-card-inner'>
                            <Link to={`/${video.id}`} style={{textDecoration: 'none', width: '100%', color: 'white', position:'relative', display:'flex', flexDirection:'row'}}>
                                <HoverVideoPlayer
                                className='hover-video-player'
                                videoClassName='recco-thumbnail-video'
                                videoSrc={`http://127.0.0.1:8000${video.video}`}
                                playbackStartDelay={500}
                                pausedOverlay={
                                    <img
                                        className='recco-thumbnail'
                                        src={`http://127.0.0.1:8000${video.thumbnail}`}
                                    />
                                }
                                loadingOverlay={
                                    <div className='loading-overlay'>
                                        <div className='loading-spinner'/>
                                    </div>
                                }
                                />
                                <div className='recco-video-card-desc-container'>
                                    <div className='recco-video-card-title'>{video.title}</div>
                                    <div className='recco-video-card-uploader' style={{margin:'0 1rem'}}>Uploader</div>
                                    <div className='recco-video-card-views-container'>
                                        <div style={{marginRight:'1rem'}}>{video.views} views</div>
                                        {get_time_diff(created_date)}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
  )
}

export default ReccomendedVids