import React, { useState, useEffect ,useContext } from 'react'
import { useParams } from 'react-router-dom';
import { fetchDataFromAPI } from '../utils/api';
import { Context } from '../context/contextAPI';
import LeftNav from "./LeftNav";
import SearchResultVideoCard from "./SearchResultVideoCard"

const SearchResult = () => {
  const [result,setResult]=useState();
  const { searchQuery }= useParams();
  const { setloading } =useContext(Context);
  useEffect(()=>{
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResult();
  },[searchQuery])
  const fetchSearchResult= ()=>{
    setloading(true);
    fetchDataFromAPI(`search/?q=${searchQuery}`).then((res)=>{
      console.log(res);
      setResult(res?.contents);
      setloading(false);
    })
  }
  return (
    <div className='flex flex-row h-[calc(100%-80px)] '>
      <LeftNav/>
      <div className='grow w-[calc(100%-240px)] h-full overflow-y-auto bg-[#942cf6]'>
        <div className='grid grid-cols-1 gap-2 p-5'>
          {result?.map((item)=>{
            if(item?.type!=="video")return false;
            let video=item?.video;
            return (
              <SearchResultVideoCard key={video?.videoId} video={video} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SearchResult