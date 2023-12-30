import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimeSearch } from '../api/AnimeSearch'

function AnimeFilter() {
  const [searchParams,setSearchParams] = useSearchParams()
  const [animeData,setAnimeData] = useState([])
  useEffect(()=>{
    const fetchData = async() =>{
      const {results,pageInfo} = await AnimeSearch(searchParams)
      setAnimeData({results,pageInfo})
    }
    fetchData()
  },[searchParams])
  return (
    <div className='text-zinc-300'>
      <h3>Filter Anime</h3>
      <input type="text" placeholder="Search Anime..." value={searchParams.get('keyword') || ''} onChange={(e)=> setSearchParams({keyword: e.target.value})} />
      <div className="grid">
        {
          // animeData?.results.map(res=>{
          //   console.log(res)
          // })
        }
      </div>
    </div>
  )
}

export default AnimeFilter