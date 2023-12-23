import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AnimeResponse } from '../api/AnimeResponse'
import AnimeStream from '../components/AnimeStream'

function AnimeDetail() {
  const {id,ep} = useParams()
  const [animeData, setAnimeData] = useState(null)
  const [animeEpisode, setAnimeEpisode] = useState(null)
  console.log(ep)
  useEffect(()=>{
    const fetchData = async() =>{
      const infoAnime = await AnimeResponse({src:`info/${id}`})
      const episodeAnime = await AnimeResponse({src:`episode/${id}`})
      setAnimeData({infoAnime: infoAnime.results})
      setAnimeEpisode({episodeAnime: episodeAnime.results})
    }
    fetchData()
  },[id])
  console.log(animeEpisode)
  return (
    <div>
      <AnimeStream id={ep} />
    </div>
  )
}

export default AnimeDetail