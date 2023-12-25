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
  let currentEpisode
  console.log(ep)
  useEffect(()=>{
    const fetchData = async() =>{
      const infoAnime = await AnimeResponse({src:`info/${id}`})
      const episodeAnime = await AnimeResponse({src:`episode/${id}`})
      const recommendations = await AnimeResponse({src: `recommendations/${id}`})
      console.log(episodeAnime)
      setAnimeRecommend({recommendAnime: recommendations?.results})
      setAnimeData({infoAnime: infoAnime.results})
      setAnimeEpisode({episodeAnime: episodeAnime.results})
    }
    fetchData()
  },[id])
  currentEpisode = animeEpisode?.episodeAnime?.episodes.filter(({id})=>id === ep)
  console.log(currentEpisode)
  console.log(animeEpisode?.episodeAnime?.episodes)
  console.log(animeData?.infoAnime)
  console.log(animeRecommend?.recommendAnime)
  return (
    <>
      <AnimeStream id={ep} />
      {
        animeEpisode?.episodeAnime?.episodes.map(({id,number})=>{
          return <ButtonEpisode key={id} id={id} number={number} />
        })
      }
    </>
  )
}

export default AnimeDetail