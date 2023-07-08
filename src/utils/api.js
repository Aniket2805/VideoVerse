import axios from "axios";

const BASE_URL = "https://youtube138.p.rapidapi.com"
const options = {
    params: {
      hl: 'en',
      gl: 'US'
    },
    headers: {
      'X-RapidAPI-Key': '0f0dd2d684mshaf5ee0b7f7361f7p162f0fjsnad3e59b26f5f',
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };

  export const fetchDataFromAPI = async (url)=>{
    const {data} =await axios.get(`${BASE_URL}/${url}`,options);
    return data;
  }