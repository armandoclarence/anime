import React, { useEffect, useMemo, useState  } from 'react'
import { LiaClosedCaptioning } from 'react-icons/lia';
import { AnimeResponse } from '../api/AnimeResponse'
import { Link, useLocation } from 'react-router-dom';
import AnimeInfo from './AnimeInfo';
import PagingButton from './PagingButton';
import NotFound from '../pages/NotFound';
import { AnimeSearch } from '../api/AnimeSearch';

function Anime({fetchType,title,query,searchParams}) {
  const [animeData, setAnimeData] = useState(null)
  const location = useLocation()
  const [isHovered, setIsHovered] = useState(false)
  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  searchParams = useMemo(()=>new URLSearchParams(location.search),[location.search])
  useEffect(()=>{
    const fetchData = async () => {
      try {
        let res;
        if(!fetchType){
          res = await AnimeSearch(searchParams) 
        }else{
          res = await AnimeResponse({ src: fetchType, query: `${query}&${searchParams}` });
        }
        setAnimeData({ results : res.results,pageInfo : res.pageInfo });
      } catch (error) {
        console.error('Error fetching anime data:', error.message);
      }
    };
    fetchData()
  },[fetchType, query,searchParams])

  return (
    <div className='p-4'>
      <div className='flex justify-between text-zinc-300 p-2' key='nav'>
        <h2>{title}</h2>
        {
          location.pathname === '/' && <Link to={fetchType}>View All</Link>
        }
      </div>
      <div key='cards' className='grid grid-cols-auto grid-cols-2 gap-2 lg:grid-cols-7 lg:gap-7 md:grid-cols-5 sm:grid-cols-4 content-center items-stretch'>
        {
          animeData &&
          animeData?.results.map((res,i)=>{
            const {id,format,episode,type,title:{english,romaji},episodes,coverImage:{large},nextAiringEpisode} = res
            return (
              <Link onMouseOver={handleHover} onMouseLeave={handleMouseLeave} to={`../anime/${id}`} key={i} data-format={type || format} className='format relative cursor-pointer group transition ease-in duration-300 text-zinc-300'>
                <div className='overflow-clip'>
                  <img src={large} className='object-cover transition group-hover:scale-105' alt={english || romaji} />
                </div>
                <div className='text-white flex items-center justify-center'>
                  {(episode || episodes) &&
                  <div className='flex items-center bg-slate-600'>
                    <LiaClosedCaptioning  />
                      {nextAiringEpisode?.episode || episode || episodes}
                  </div>
                  }
                  <div className='bg-zinc-700'>
                    {episodes || nextAiringEpisode?.episode}
                  </div>
                </div>
                <h3 className='text-[#c4c4c4] text-center group-hover:text-slate-100 text-ellipsis line-clamp-2'>{english || romaji}</h3>
                <AnimeInfo isHovered={isHovered} animeInfo={res} />
              </Link>  
            )
          })
        }
      </div>
      {
        (location.pathname !== '/' &&  animeData && animeData?.pageInfo?.total !== 0 && <PagingButton key='page' searchParams={searchParams} pageInfo={animeData?.pageInfo} />) || (!searchParams && <NotFound/>)
      }
    </div>
  )
}

export default Anime