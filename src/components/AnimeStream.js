import React, { useEffect } from 'react'
import { AnimeResponse } from '../api/AnimeResponse'
import videojs from 'video.js';

function AnimeStream() {
  useEffect(()=>{
    const fetchData = async() =>{
      let player = videojs('anime-video')
      try{
        const {streamData} = await AnimeResponse({src:'stream/cowboy-bebop-episode-1'})
        console.log(streamData)
        const {multi:{main:{url}}} = streamData
        player.src({
          src: url,
          type: 'application/x-mpegURL', 
        });
      } catch (error) {
        console.error('Error fetching anime data:', error.message);
      return () => {
        player.dispose();
      };
    }
    }
    fetchData()
  },[])
  return (
    <div>
      {
        <video id='anime-video' controls width="320" height="240" data-setup='{"fluid": true}'
        />
      }
    </div>
  )
}

export default AnimeStream