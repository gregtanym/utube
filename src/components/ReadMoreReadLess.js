import React, { useState } from 'react'

const ReadMoreReadLess = ({children}) => {

    const [isReadMoreShown, setReadMoreShown] = useState(false)
    const toggleButton = () => {
        setReadMoreShown(!isReadMoreShown)
    }

    console.log('this is children: ', children)

  return (
    <div className='single-video-desc'>
        {isReadMoreShown ? children : children.substring(0, 200) + '...'}
        <button className='read-more-button' onClick={toggleButton}>{isReadMoreShown ? <b>Show Less</b> : <b>Show More</b>}</button>
    </div>
  )
}

export default ReadMoreReadLess