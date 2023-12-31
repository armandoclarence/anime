import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimeSearch } from '../api/AnimeSearch'
import {genres,years,season,country,format,status,sort} from '../data/arrayAnime'

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
    <div className='text-zinc-300 px-2'>
      <h3>Filter Anime</h3>
      <ul className="grid grid-cols-5 gap-2 pb-3">
        <li className='h-8 bg-zinc-600 hover:bg-slate-800'>
          <input className='w-full h-8' type="text" placeholder="Search Anime..." value={searchParams.get('keyword') || ''} onChange={(e)=> setSearchParams({keyword: e.target.value})} />
        </li>
        <li className='group w-full h-8 bg-zinc-600 hover:bg-slate-800 cursor-pointer'>
          <button className='h-8'>Type</button>
          <ul className='absolute hidden group-hover:block z-10 w-64 bg-zinc-700'>
            {
              format.map(type=>(
                <li className='hover:bg-slate-700 px-3' key={type}>{type}</li>
              ))
            }
          </ul>
        </li>
        <li className='group w-full h-8 bg-zinc-600 hover:bg-slate-800 cursor-pointer'>
          <button className='h-8'>Genre</button>
          <ul className='absolute grid-cols-4 hidden group-hover:grid z-10 w-1/3 bg-zinc-700'>
            {
              genres.map(genre=>(
                <li className='hover:bg-slate-700 px-3' key={genre}>{genre}</li>
              ))
            }
          </ul>
        </li>
        <li className='group w-full h-8 bg-zinc-600 hover:bg-slate-800 cursor-pointer'>
          <button className='h-8'>Year</button>
          <ul className='absolute hidden group-hover:block z-10 w-64 bg-zinc-700'>
            {
              years.map(year=>(
                <li className='hover:bg-slate-700 px-3' key={year}>{year}</li>
              ))
            }
          </ul>
        </li>
        <li className='group w-full h-8 bg-zinc-600 hover:bg-slate-800 cursor-pointer'>
          <button className='h-8'>Status</button>
          <ul className='absolute hidden group-hover:block z-10 w-64 bg-zinc-700'>
            {
              status.map(statusAnime=>(
                <li className='hover:bg-slate-700 px-3' key={statusAnime}>{statusAnime}</li>
              ))
            }
          </ul>
        </li>
        <li className='group w-full h-8 bg-zinc-600 hover:bg-slate-800 cursor-pointer'>
          <button className='h-8'>Country</button>
          <ul className='absolute hidden group-hover:block z-10 w-64 bg-zinc-700'>
            {
              country.map(region=>(
                <li className='hover:bg-slate-700 px-3' key={region}>{region}</li>
              ))
            }
          </ul>
        </li>
        <li className='group w-full h-8 bg-zinc-600 hover:bg-slate-800 cursor-pointer'>
          <button className='h-8'>Season</button>
          <ul className='absolute hidden group-hover:block z-10 w-64 bg-zinc-700'>
            {
              season.map(seasonAnime=>(
                <li className='hover:bg-slate-700 px-3' key={seasonAnime}>{seasonAnime}</li>
              ))
            }
          </ul>
        </li>
        <li className='group w-full h-8 bg-zinc-600 hover:bg-slate-800 cursor-pointer'>
          <button className='h-8'>END DATE</button>
          <ul className='absolute hidden group-hover:block z-10 w-64 bg-zinc-700'>
            {
              sort.map(sortAnime=>(
                <li className='hover:bg-slate-700 px-3' key={sortAnime}>{sortAnime}</li>
              ))
            }
          </ul>
        </li>
        <li className='group w-full h-8 hover:text-zinc-300 text-slate-500 font-bold bg-zinc-300 hover:bg-slate-800 cursor-pointer'>
          <button className='h-8'>Filter</button>
        </li>
      </ul>
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