import { useEffect, useState  } from 'react'
import { LiaClosedCaptioning } from 'react-icons/lia';
import { AnimeResponse } from '../api/AnimeResponse'
import { useLocation } from 'react-router-dom';
import AnimeInfo from './AnimeInfo';
import PagingButton from './PagingButton';
import NotFound from '../pages/NotFound';
import { AnimeSearch } from '../api/AnimeSearch';
import { useMemo } from 'react';

function Anime({fetchType,title,query,searchParams}) {
  const [animeData, setAnimeData] = useState(null)
  const location = useLocation()

  searchParams = useMemo(()=> new URLSearchParams(location.search),[location.search]) || ''

  useEffect(()=>{
    const fetchData = async () => {
      try {
        let res;
        if(!fetchType){
          res = await AnimeSearch(searchParams) 
        }else{
          res = await AnimeResponse({ src: fetchType, query: `${query}${searchParams.length > 0 ? `&${searchParams}` : ''}` });
        }
        setAnimeData({ results : res.results,pageInfo : res.pageInfo });
      } catch (error) {
        console.error('Error fetching anime data:', error.message);
      }
    };
    fetchData()
  },[fetchType, query,searchParams.get("p")])
  console.log(animeData)
  return (
    <div className='p-4'>
      <div className='flex justify-between text-zinc-300 p-2' key='nav'>
        <h2>{title}</h2>
        {
          location.pathname === '/' && <a href={fetchType}>View All</a>
        }
      </div>
      <div key='cards' className='grid grid-cols-[repeat(auto-fill,164px)] gap-2 justify-between content-center items-stretch'>
      {animeData?.results?.map((res)=>{
        const {id,format,episode,type,title:{english,romaji},episodes,coverImage:{large},nextAiringEpisode, nextAir} = res
        return (
          <a href={`/anime/${id}`} key={id} data-format={type || format} className='format relative cursor-pointer group transition ease-in duration-300 text-zinc-300'>
            <div className='overflow-clip h-64'>
              <img width='164' height='256' src={large} alt={english || romaji} className='h-full object-cover transition group-hover:scale-105' />
            </div>
            <div className='text-white flex items-center justify-center'>
              {(episode || episodes) &&
              <div className='flex items-center bg-slate-600'>
                <LiaClosedCaptioning aria-label='caption' />
                  {nextAir?.episode || nextAiringEpisode?.episode || episode || episodes}
              </div>
              }
              <div className='bg-zinc-700'>
                {episodes || nextAir?.episode || nextAiringEpisode?.episode}
              </div>
            </div>
            <h3 className='text-[#c4c4c4] text-center group-hover:text-slate-100 text-ellipsis line-clamp-2'>{english || romaji}</h3>
            <AnimeInfo animeInfo={res} />
          </a> 
        )
      })}
      </div>
      {
        (location.pathname !== '/' && animeData?.pageInfo && animeData?.pageInfo?.total !== 0 && <PagingButton key='page' searchParams={searchParams} pageInfo={animeData?.pageInfo} />) || (!searchParams && <NotFound/>)
      }
    </div>
  )
}

export default Anime