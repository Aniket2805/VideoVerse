import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player/youtube'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { AiOutlineLike, AiFillEye } from 'react-icons/ai'
import { abbreviateNumber } from 'js-abbreviation-number'
import { fetchDataFromAPI } from '../utils/api'
import { Context } from '../context/contextAPI'
import LeftNav from "./LeftNav";
import SuggestionVideoCard from './SuggestionVideoCard'
const VideoDetails = () => {
  const [video, setVideo] = useState();
  const [releatedVideos, setreleatedVideos] = useState();
  const { id } = useParams();
  const { setloading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    fetchVideoDetails();
    fetchReleatedVideos();
  }, [id]);

  const fetchVideoDetails = () => {
    setloading(true);
    fetchDataFromAPI(`video/details/?id=${id}`).then((res) => {
      setVideo(res);
      setloading(false);
    })
  };

  const fetchReleatedVideos = () => {
    setloading(true);
    fetchDataFromAPI(`video/related-contents/?id=${id}`).then((res) => {
      setreleatedVideos(res);
      setloading(false);
    })
  };

  return (
    <div className='flex flex-row h-[calc(100%-80px)] bg-[#942cf6]'>
      <LeftNav></LeftNav>
      <div className='w-full max-w-[1280px] flex flex-col lg:flex-row'>
        <div className='flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto'>
          <div className='h-[300px] md:h-[400px] lg:h-[400px] xl:h-[550px] lg:ml-0 lg:mr-0'>
            <ReactPlayer
              url={`https:/www.youtube.com/watch?v=${id}`}
              controls
              playing={true}
              width="100%"
              height="100%"
              style={{ backgroundColor: "#942cf6" }}
            />
          </div>
          <div className='text-white font-bold text-sm md:text-xl mt-4 line-clamp-2'>
            {video?.title}
          </div>
          <div className='flex flex-col md:flex-row mt-4 justify-between'>
            <div className='flex'>
              <div className='flex items-center'>
                <div className='flex h-11 w-11 rounded-full overflow-hidden'>
                  <img className='h-full w-full object-cover' src={video?.author?.avatar[0]?.url} />
                </div>
              </div>
              <div className='flex flex-col ml-3'>
                <div className='text-white text-md font-semibold flex items-center'>
                  {video?.author?.title}
                  {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" &&
                    <BsFillCheckCircleFill className='text-white/[0.5] text-[12px] ml-1'></BsFillCheckCircleFill>}
                </div>
                <div className='text-white/[0.7] text-sm'>
                  {video?.author?.stats?.subscribersText}
                </div>
              </div>
            </div>
            <div className='flex text-white mt-4 md:mt-0'>
              <div className='flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]'>
                <AiOutlineLike className='text-xl text-white mr-2' />
                <span>{`${abbreviateNumber(video?.stats?.likes, 2)} Likes`}</span>
              </div>
              <div className='flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4'>
                <AiFillEye className='text-xl text-white mr-2' />
                <span>{`${abbreviateNumber(video?.stats?.views, 2)} Views`}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]'>
          {releatedVideos?.contents?.map((item, index) => {
            if (item?.type !== "video") return false;
            return (
              <SuggestionVideoCard key={index} video={item?.video}></SuggestionVideoCard>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default VideoDetails