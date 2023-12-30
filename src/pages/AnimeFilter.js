import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimeSearch } from '../api/AnimeSearch'

function AnimeFilter() {
  const [params,setParams] = useSearchParams()
  const [animeData,setAnimeData] = useState([])
  useEffect(()=>{
    const fetchData = async() =>{
      const {results} = await AnimeSearch(params)
      setAnimeData({results})
    }
    fetchData()
  },[params])
  console.log(animeData?.results)
  return (
    <div className='text-zinc-300'>
      <h3>Filter Anime</h3>
    </div>
  )
}

export default AnimeFilter