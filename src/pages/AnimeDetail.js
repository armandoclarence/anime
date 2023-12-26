import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { AnimeResponse } from '../api/AnimeResponse'
import AnimeRecommend from '../components/AnimeRecommend'
import AnimeStream from '../components/AnimeStream'
import ButtonEpisode from '../components/ButtonEpisode'

function AnimeDetail() {
  const {id,ep} = useParams()
  const location = useLocation()
  console.log(location)
  const [animeData, setAnimeData] = useState(null)
  const [animeEpisode, setAnimeEpisode] = useState(null)
  const [animeRecommend, setAnimeRecommend] = useState(null)
  useEffect(()=>{
    const fetchData = async() =>{
      const infoAnime = await AnimeResponse({src:`info/${id}`})
      const episodeAnime = await AnimeResponse({src:`episode/${id}`})
      const recommendations = await AnimeResponse({src: `recommendations/${id}`})
      setAnimeRecommend({recommendAnime: recommendations?.results})
      setAnimeData({infoAnime: infoAnime.results})
      setAnimeEpisode({episodeAnime: episodeAnime.results})
    }
    fetchData()
  },[id])
  /*
    coverImage:large
    description
    duration
    episodes
    format
    genres
    score:decimalScore
    studios
    title:english,romaji
    year
  */ 
 const createMarkup = (content) => {
   return { __html: content };
  };
  return (
    <>
      <div className='flex overflow-x-clip gap-3 justify-between bg-slate-950 text-white p-2'>
        <div className='flex flex-col'>
          <AnimeStream id={ep}/>
          <div className='grid grid-cols-3'>
            {animeData?.infoAnime && 
              (()=>{
                const {coverImage:{large},description,duration,episodes,format,genres,score:{decimalScore},studios,title:{english,romaji},year} = animeData.infoAnime
                return (
                  <>
                    <img src={large} alt={english || romaji} />
                    <p dangerouslySetInnerHTML={createMarkup(description)} />
                    <span>{duration}</span>
                  </>
                )
              })()
            }
          </div>
          <div className='grid justify-between gap-2 grid-cols-[repeat(15,minmax(2rem,1fr))]'>
            {
              animeEpisode?.episodeAnime?.episodes.map(({id,number})=>{
                return <ButtonEpisode key={id} id={id} number={number} />
              })
            }
          </div>
        </div>
        <AnimeRecommend recommend={animeRecommend?.recommendAnime?.results} />
      </div>
    </>
  )
}

export default AnimeDetail