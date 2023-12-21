import React, { useEffect, useState } from 'react'
import { LiaClosedCaptioning } from "react-icons/lia";
import { AnimeResponse } from '../api/AnimeResponse'

function Anime() {
  const [animeData, setAnimeData] = useState(null)
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const { results, page } = await AnimeResponse({ src: 'schedule', query: 'p=1&limit=14' });
        setAnimeData({ results, page });
      } catch (error) {
        console.error('Error fetching anime data:', error.message);
      }
    };
    fetchData();
  },[])
  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-7 lg:gap-7 md:gap-5 sm:gap-4 md:grid-cols-5 sm:grid-cols-4 content-center items-strech">
      {
        animeData?.results.map((res)=>{
          const {id,episode,type,title:{english,romaji},episodes,coverImage:{large}} = res
          console.log(res)
          return (
            <div key={id} className="cursor-pointer hover:text-slate-700 transition ease-in duration-300 text-zinc-300">
              <div className="absolute text-white bg-slate-700">
                {type}
              </div>
              <img src={large} className="lg:w-52 w-80 h-64 sm:w-60 lg:h-56" alt={english || romaji} />
              <div className='text-white flex items-center justify-center'>
                <div className="flex items-center bg-slate-600">
                  <LiaClosedCaptioning className='text-white' />
                  {episode}
                </div>
                <div className="bg-zinc-700">
                  {episodes}
                </div>
              </div>
              <h2 className="text-slate-200 hover:text-slate-500 text-ellipsis line-clamp-2">{english || romaji}</h2>
            </div>  
          )
        })
      }
    </div>
  )
}

export default Anime