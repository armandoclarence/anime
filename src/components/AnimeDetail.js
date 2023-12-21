import React, { useEffect, useState } from 'react'
import { AnimeResponse } from '../api/AnimeResponse'

function AnimeDetail() {
  const [animeData, setAnimeData] = useState(null)
  useEffect(()=>{
    async function fetchData(){
      const anime = await AnimeResponse({src:'stream', query:''})
      
    }
  },[])
  return (
    <div>
    </div>
  )
}

export default AnimeDetail