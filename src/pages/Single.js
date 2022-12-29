import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import ReadMoreReadLess from '../components/ReadMoreReadLess'

const Single = () => {

    const {fetchSingleVideo, singleVideoDetails, setSingleVideoDetails} = useGlobalContext()
    const [isReadMoreShown, setReadMoreShown] = useState(false)
    const {id} = useParams()
    // useeffect is used here to prevent the website from re rendering when we are changing the state which would cause an infinite loop
    useEffect(()=>{
        const load = async () =>{
            await fetchSingleVideo(id)
        }
        load()
    }, [])

    const toggleButton = () => {
        setReadMoreShown(!isReadMoreShown)
    }

    const readmore_func = (data) => {
        try{
            if(data.length<=200){
                return <div className='single-video-desc'>
                    {data}
                </div>
            }
            return <div className='single-video-desc'>
                {isReadMoreShown ? data : data.substring(0, 200) + '...'}
                <button className='read-more-button' onClick={toggleButton}>{isReadMoreShown ? <b>Show Less</b> : <b>Show More</b>}</button>
            </div>
        }
        catch(error){
            // console.log("TypeError: Cannot read properties of undefined (reading 'substring')")
            return
        }
        
    }

  return (
    <div>
        <Header/>
        <div className='single-container'>
            <div className='single-video-container'>
                {/* had to specifically define height of video component because min-height attribute cannot be inherited by the children divs */}
                <div className="embed-responsive embed-responsive-16by4" style={{width: '100%', height: '30rem'}}>
                    <iframe className="embed-responsive-item" style={{ width: '100%', height: '100%', border: 'none'}} src={singleVideoDetails['file']} allowFullScreen></iframe>
                </div>
                <div className='single-video-title'>
                    {singleVideoDetails['title']}
                </div>
                <div className='single-acc-info'>
                    account info
                </div>
                <div>
                    {readmore_func(singleVideoDetails['description'])}
                </div>
                <div>
                    comments section
                </div>
            </div>
            <div className='recc-video-container'>
                reccomended videos
            </div>
        </div>
    </div>
    
  )
}

export default Single

// i will probably just get the id and then fish out all the other info like video title and wtv from the id alone. hence i will have to make a post/get request