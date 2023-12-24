import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AnimeResponse } from '../api/AnimeResponse'
import AnimeStream from '../components/AnimeStream'
import ButtonEpisode from '../components/ButtonEpisode'

function AnimeDetail() {
  const {id,ep} = useParams()
  const [animeData, setAnimeData] = useState(null)
  const [animeEpisode, setAnimeEpisode] = useState(null)
  const [animeRecommend, setAnimeRecommend] = useState(null)
  console.log(ep)
  useEffect(()=>{
    const fetchData = async() =>{
      const infoAnime = await AnimeResponse({src:`info/${id}`})
      const episodeAnime = await AnimeResponse({src:`episode/${id}`})
      const recommendations = await AnimeResponse({src: `recommendations/${id}`})
      setAnimeRecommend({recommendAnime: recommendations?.results})
      setAnimeData({infoAnime: infoAnime.results})
      setAnimeEpisode({episodeAnime: episodeAnime.results,id})
    }
    fetchData()
  },[id])
  console.log(animeEpisode?.episodeAnime)
  console.log(animeData?.infoAnime?.episodes)
  console.log(animeRecommend?.recommendAnime)
  return (
    <>
      <AnimeStream id={ep} />
      {
        animeEpisode?.episodeAnime?.episodes.map(({id,number})=>{
          console.log(id)
          return <ButtonEpisode key={id} id={id} number={number} />
        })
      }
    </>
  )
}

export default AnimeDetail