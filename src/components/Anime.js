import React, { useEffect, useState } from 'react'
import { LiaClosedCaptioning, LiaStar } from "react-icons/lia";
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
<<<<<<< HEAD
            const {id,malId,episode,type,title:{english,romaji},episodes,coverImage:{large},nextAiringEpisode,genres} = res
            return (
              <div key={malId ||episode} className="cursor-pointer group hover:text-slate-700 transition ease-in duration-300 text-zinc-300">
=======
            const {id,rating,malId,episode,type,title:{english,romaji},episodes,coverImage:{large},nextAiringEpisode,genres,meanScore,description,releaseDate} = res
            const createMarkup = (content) => {
              return { __html: content };
            };
            console.log(res)
            return (
              <div key={malId ||episode} className="relative cursor-pointer group transition ease-in duration-300 text-zinc-300">
>>>>>>> e7e6e6a (adding hover image and make anime detail js)
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
<<<<<<< HEAD
                <h3 className="text-slate-200 group-hover:text-slate-500 text-ellipsis line-clamp-2">{english || romaji}</h3>
=======
                <h3 className="text-slate-200 text-center group-hover:text-slate-500 text-ellipsis line-clamp-2">{english || romaji}</h3>
                <div className="grid group-hover:grid grid-cols-auto bg-gray-800 absolute left-44 z-20 w-64 h-60 top-0">
                  <div className="relative px-2.5 ">
                    <div className="absolute z-30 left-2 text-white bg-slate-700">
                      {type}
                    </div>
                    <h3>{romaji}</h3>
                    <h4 className='truncate'>{romaji};{english}</h4>
                    <div className="flex items-center gap-2">
                      <div className='flex'>
                        <LiaStar/>
                        {meanScore / 10 || rating / 10}
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
                    </div>
                    <p className="line-clamp-3 text-ellipsis" dangerouslySetInnerHTML={createMarkup(description)} />
                    <p>Score: {meanScore / 10 || rating / 10}</p>
                    <p>Year: {releaseDate}</p>
                  </div>
                </div>
>>>>>>> e7e6e6a (adding hover image and make anime detail js)
              </div>  
            )
          })
        }
      </div>
    </>
  )
}

export default Anime