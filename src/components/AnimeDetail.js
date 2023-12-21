import React, { useEffect, useState } from 'react'
import { AnimeResponse } from '../api/AnimeResponse'

function AnimeDetail() {
  const [animeData, setAnimeData] = useState(null)
  useEffect(()=>{
    const fetchData = async() =>{
      try{
        const {streamData} = await AnimeResponse({src:'stream/cowboy-bebop-episode-1'})
        console.log(streamData)
        const {multi:{main:{url}}} = streamData
        setAnimeData({url})
      } catch (error) {
      console.error('Error fetching anime data:', error.message);
    }
    }
    fetchData()
  },[])
  return (
    <div>
      {
        <video controls width="320" height="240">
          <source src={animeData?.url}  type="application/x-mpegURL" />
        </video>
      }
    </div>
  )
}

export default AnimeDetail