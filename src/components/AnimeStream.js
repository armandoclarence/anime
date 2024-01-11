import { useEffect } from 'react'
import { AnimeResponse } from '../api/AnimeResponse'
import './style/video.css'
import videojs from 'video.js'

function AnimeStream({poster,id}) {
  console.log(poster)
  useEffect(()=>{
    let player = videojs('anime-video')
    const fetchData = async() =>{
      if(id === undefined) return
      try{
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