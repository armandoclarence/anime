import React from 'react'
import {LiaClosedCaptioning,LiaStar} from 'react-icons/lia'

function AnimeInfo({animeInfo}) {
  const {format,status,type,title:{english,romaji},genres,episode,rating,nextAiringEpisode,episodes,averageScore,description,releaseDate,seasonYear} = animeInfo
  const statusText = (status || 'RELEASING').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  const createMarkup = (content) => {
    return { __html: content };
  };
  return (
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
  )
}

export default AnimeInfo
