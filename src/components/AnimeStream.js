import React, { useEffect } from 'react'
import { AnimeResponse } from '../api/AnimeResponse'
import 'video.js/dist/video-js.css';
import './style/video.css'
import videojs from 'video.js'

function AnimeStream({poster,id}) {
  console.log(poster)
  useEffect(()=>{
    const fetchData = async() =>{
      let player = videojs('anime-video')
      try{
        if(id === undefined) return
        const {streamData} = await AnimeResponse({src:`stream/`,id})
        const {multi:{main:{url}}} = streamData
        player.src({
          src: url,
          type: 'application/x-mpegURL', 
        });
        player.pause();
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
        <video poster={poster} id='anime-video' width='720px' height='480px' preload='auto' data-setup='{}'/>
      }
    </>
  )
}

export default AnimeStream