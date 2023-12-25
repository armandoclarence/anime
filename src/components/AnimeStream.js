import React, { useEffect } from 'react'
import { AnimeResponse } from '../api/AnimeResponse'
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './style/video.css'

function AnimeStream({id}) {
  useEffect(()=>{
    const fetchData = async() =>{
      let player = videojs('anime-video')
      try{
        const {streamData} = await AnimeResponse({src:`stream/${id}`})
        console.log(streamData)
        const {multi:{main:{url}}} = streamData
        player.src({
          src: url,
          type: 'application/x-mpegURL', 
        });
        player.pause();
        player.aspectRatio("4:3")
      } catch (error) {
        console.error('Error fetching anime data:', error.message);
      return () => {
        player.dispose();
      };
    }
    }
    fetchData()
  },[id])
  return (
    <>
      {
        <video id='anime-video' height='480' width='720' preload='auto'/>
      }
    </>
  )
}

export default AnimeStream