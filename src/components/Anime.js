import React, { useEffect, useState } from 'react'
import { LiaClosedCaptioning } from "react-icons/lia";
import { AnimeResponse } from '../api/AnimeResponse'
// import AnimeDetail from './AnimeDetail';

function Anime({fetchType,title,query}) {
  const [animeData, setAnimeData] = useState(null)
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const { results } = await AnimeResponse({ src: fetchType, query: query });
        setAnimeData({ results });
      } catch (error) {
        console.error('Error fetching anime data:', error.message);
      }
    };
    fetchData();
  },[fetchType, query])
  return (
    <>
      <h2 className='text-zinc-300 flex justify-start'>{title}</h2>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-7 lg:gap-7 md:gap-5 sm:gap-4 md:grid-cols-5 sm:grid-cols-4 content-center items-strech">
        {
          animeData?.results.map((res)=>{
            const {id,malId,episode,type,title:{english,romaji},episodes,coverImage:{large},nextAiringEpisode,genres} = res
            return (
              <div key={malId ||episode} className="cursor-pointer group hover:text-slate-700 transition ease-in duration-300 text-zinc-300">
                <div className="absolute z-10 text-white bg-slate-700">
                  {type}
                </div>
                <div className='overflow-clip'>
                  <img src={large} className="transition group-hover:scale-105 lg:w-52 w-80 h-64 sm:w-60 lg:h-56" alt={english || romaji} />
                </div>
                <div className='text-white flex items-center justify-center'>
                  {(episode || episodes) &&
                    <div className="flex items-center bg-slate-600">
                      <LiaClosedCaptioning className='text-white' />
                      {nextAiringEpisode?.episode || episode || episodes}
                    </div>
                  }
                  <div className="bg-zinc-700">
                    {episodes || nextAiringEpisode?.episode}
                  </div>
                </div>
                <h3 className="text-slate-200 group-hover:text-slate-500 text-ellipsis line-clamp-2">{english || romaji}</h3>
              </div>  
            )
          })
        }
      </div>
    </>
  )
}

export default Anime