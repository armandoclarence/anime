import React, { useEffect, useState } from 'react'
import { LiaClosedCaptioning, LiaStar } from 'react-icons/lia';
import { AnimeResponse } from '../api/AnimeResponse'
import { useNavigate } from 'react-router-dom';

function Anime({fetchType,title,query}) {
  const [animeData, setAnimeData] = useState(null)
  const navigate = useNavigate()
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const { results:{results} } = await AnimeResponse({ src: fetchType, query: query });
        const episodePromises = results.map(async ({ id }) => {
          const { results: { episodes } } = await AnimeResponse({ src: `episode/${id}` });
          return episodes[0];
        });
        const episodeData = await Promise.all(episodePromises)
        setAnimeData({ results,episodeData });
      } catch (error) {
        console.error('Error fetching anime data:', error.message);
      }
    };
    fetchData()
  },[fetchType, query])
  return (
    <div>
      <h2 key={title} className='text-zinc-300 flex justify-start'>{title}</h2>
      <div key='cards' className='grid grid-cols-auto grid-cols-2 gap-2 lg:grid-cols-7 lg:gap-7 md:grid-cols-5 sm:grid-cols-4 content-center items-strech'>
        {
          animeData?.results.map((res,i)=>{
            const idEpisode = animeData?.episodeData[i]
            const {id,format,rating,malId,episode,type,title:{english,romaji},episodes,coverImage:{large},nextAiringEpisode,genres,status,averageScore,description,releaseDate,seasonYear} = res
            const statusText = (status || 'RELEASING').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
            const createMarkup = (content) => {
              return { __html: content };
            };
            return (
              <div onClick={()=> navigate(`anime/${id}/${idEpisode.id}`)} key={malId ||episode} data-format={type || format} className='format relative cursor-pointer group transition ease-in duration-300 text-zinc-300'>
                <div className='overflow-clip'>
                  <img src={large} className='object-cover transition group-hover:scale-105 lg:w-52 w-80 h-64 sm:w-60 lg:h-56' alt={english || romaji} />
                </div>
                <div className='text-white flex items-center justify-center'>
                  {(episode || episodes) &&
                    <div className='flex items-center bg-slate-600'>
                      <LiaClosedCaptioning className='text-white' />
                      {nextAiringEpisode?.episode || episode || episodes}
                    </div>
                  }
                  <div className='bg-zinc-700'>
                    {episodes || nextAiringEpisode?.episode}
                  </div>
                </div>
                <h3 className='text-[#c4c4c4] text-center group-hover:text-slate-100 text-ellipsis line-clamp-2'>{english || romaji}</h3>
                <div data-format={type || format} className='box-border transition duration-300 format format:p-2 pt-7 pb-4 px-3 hidden group-hover:grid grid-cols-auto bg-gray-800 absolute left-44 z-20 w-80 top-10'>
                  <h3>{romaji}</h3>
                  <h4 className='truncate'>{romaji};{english}</h4>
                  <br />
                  <div className='flex items-center gap-2'>
                    <div className='flex'>
                      <LiaStar/>
                      {rating ? (rating / 10).toFixed(2) : (averageScore /10).toFixed(2)}
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
                  </div>
                  <br />
                  <p className='line-clamp-3 text-ellipsis text-sm' dangerouslySetInnerHTML={createMarkup(description)} />
                  <br />
                  <p className='text-sm'>Score: {rating ? (rating / 10).toFixed(2) : (averageScore /10).toFixed(2)}</p>
                  <p className='text-sm'>Year: {releaseDate || seasonYear || 'N/A'}</p>
                  <p className='text-sm'>Status: {statusText || 'RELEASING'}</p>
                  <p className='text-sm flex flex-wrap'>Genre: {genres.join(',')}</p>
                </div>
              </div>  
            )
          })
        }
      </div>
    </div>
  )
}

export default Anime