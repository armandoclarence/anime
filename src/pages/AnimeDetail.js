import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AnimeResponse } from '../api/AnimeResponse'

function AnimeDetail() {
  const {id,ep} = useParams()
  const [animeData, setAnimeData] = useState(null)
  const [animeEpisode, setAnimeEpisode] = useState(null)
  useEffect(()=>{
    const fetchData = async() =>{
      const infoAnime = await AnimeResponse({src:`info/${id}`})
      const episodeAnime = await AnimeResponse({src:`episode/${id}`})
      // const streamAnime = await AnimeResponse({src:''})
      console.log(infoAnime.results)
      console.log(episodeAnime.results)
    }
    fetchData()
  },[id])
  console.log(id)
  console.log(ep)
  return (
    <div>AnimeDetail {id}</div>
  )
}

export default AnimeDetail