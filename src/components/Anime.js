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
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-7 lg:gap-7 md:gap-5 sm:gap-4 md:grid-cols-5 sm:grid-cols-4 content-center items-strech">
      {
        animeData?.results.map((res)=>{
          const {id,episode,type,title:{english,romaji},episodes,coverImage:{large}} = res
          console.log(res)
          return (
            <div key={id} className="text-gray-400  hover:text-gray-500">
              <div className="absolute text-white bg-black">
                {type}
              </div>
              <img src={large} className="lg:w-52 w-80 h-64 sm:w-60 lg:h-56" alt={english || romaji} />
              <div>{episode} | {episodes}</div>
              <h2 className="text-ellipsis line-clamp-2">{english || romaji}</h2>
            </div>  
          )
        })
      }
    </div>
  )
}

export default Anime