import React, { useEffect, useState } from 'react'
import { AnimeResponse } from '../api/AnimeResponse'

function Anime() {
  const [animeData, setAnimeData] = useState(null)
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const { results, page } = await AnimeResponse({ src: 'schedule', query: 'p=1&limit=14' });
        console.log(results)
        setAnimeData({ results, page });
      } catch (error) {
        console.error('Error fetching anime data:', error.message);
        // Handle errors if needed
      }
    };

    fetchData();
  },[])
  /* 
    id idMal
    episode
    rating 
    title: english | romaji
    episodes
    bannerImage
    duration
    genres
    type
  */ 
  return (
    <div className="grid grid-cols-8 md:grid-cols-6 sm:grid-cols-4 place-items-center">
      {
        animeData?.results.map((res)=>{
          const {id,episode,type,title:{english,romaji},episodes,coverImage:{large}} = res
          console.log(res)
          return (
            <div key={id} className="relative w-40">
              <div className="absolute text-black">
                {type}
              </div>
              <img src={large} className="w-40 h-52" alt={english || romaji} />
              <div>{episode} | {episodes}</div>
              <h2>{english || romaji}</h2>
            </div>
          )
        })
      }
    </div>
  )
}

export default Anime