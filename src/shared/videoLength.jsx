import React from 'react'
import moment from 'moment';
const VideoLength = ({time}) => {
    const videoLength=moment().startOf("day").seconds(time).format("H:mm:ss");
  return (
    <div className='absolute bottom-2 right-2 bg-[#942cf6] py-1 px-2 text-white text-xs rounded-md'>{videoLength}</div>
  )
}

export default VideoLength