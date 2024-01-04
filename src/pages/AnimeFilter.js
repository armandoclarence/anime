import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Anime from '../components/Anime'
import {genres,years,season,country,format,status,sort} from '../data/arrayAnime'

function AnimeFilter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isAdult, setIsAdult] = useState(false)
  const [filter, setFilter] = useState({
    title : searchParams.get('title') || '',
    'genre' : searchParams.get('genre') ? searchParams.get('genre').split(',') : [],
    year : searchParams.get('year') || '',
    seasonAnime : searchParams.get('seasonAnime') || '',
    statusAnime : searchParams.get('statusAnime') || '',
    type : searchParams.get('type') || '',
    region : searchParams.get('region') || '',
    'sorting' : searchParams.get('sorting') ? searchParams.get('sorting').split(',') : [],
    p : searchParams.get('p') || '1',
    isAdult : isAdult
  })
  const handleInputChange = (event) => {
    console.log(filter)
    setFilter({...filter,title:event.target.value})
    setSearchParams({...filter,title:event.target.value})
  }

  const handleSingleChange = (key,value) =>{
    if(key === 'isAdult') setIsAdult((prevIsAdult)=>!prevIsAdult)
    setFilter({...filter,[key]:value})
    setSearchParams({...filter,[key]:value})
  }

  const handleArrayChange = (arr, value) => {
    setSearchParams((prevParams) => {
      const existingArray = prevParams.getAll(arr);
      const updatedArray = existingArray.includes(value)
        ? existingArray.filter((item) => item !== value)
        : [...existingArray, value];
      console.log(`arr: ${arr},value: ${value}, existingArray: ${existingArray}, updatedArray: ${updatedArray}`)
      // Remove all occurrences of the key
      const newSearchParams = new URLSearchParams(prevParams.toString());
      newSearchParams.delete(arr);
  
      // Add the updated array to the parameters
      updatedArray.forEach((item) => newSearchParams.append(arr, item));
  
      // Update the filter state
      setFilter((prevFilter) => ({ ...prevFilter, [arr]: updatedArray }));
  
      return newSearchParams;
    });
  };
    

  return (
    <div className='text-zinc-300 px-2'>
      <h3>Filter Anime</h3>
      <ul className="grid grid-cols-5 gap-2 pb-3">
        <li className='h-8 bg-zinc-600 hover:bg-slate-800'>
          <input className='w-full h-8' type="text" placeholder="Search Anime..." value={searchParams.get('title') || ''} onChange={(e)=>handleInputChange(e)} />
        </li>
        <li className='group w-full focus-within:visible h-8 bg-zinc-600 hover:bg-slate-800 cursor-pointer'>
          <button className='w-full h-8'>Type</button>
          <ul className='absolute hidden group-hover:block z-10 w-64 bg-zinc-700'>
            {
              format.map(type=>(
                <li className='hover:bg-slate-700 pl-2' onClick={()=>handleSingleChange('type',type)} key={type}>{type}</li>
              ))
            }
          </ul>
        </li>
        <li className='group w-full h-8 bg-zinc-600 hover:bg-slate-800 cursor-pointer'>
          <button className='w-full h-8'>Genre</button>
          <ul className='absolute grid-cols-4 hidden group-hover:grid z-10 w-1/3 bg-zinc-700'>
            {
              genres.map(genre=>(
                <li className='hover:bg-slate-700 w-full flex pl-2' key={genre}>
                  <input className='cursor-pointer' type="checkbox" onClick={()=>handleArrayChange('genre',genre)} checked={filter['genre'].includes(genre)} name={genre} id={genre} />
                  <label className='w-full cursor-pointer' htmlFor={genre}>{genre}</label>
                </li>
              ))
            }
          </ul>
        </li>
        <li className='group w-full h-8 bg-zinc-600 hover:bg-slate-800 cursor-pointer'>
          <button className='w-full h-8'>Year</button>
          <ul className='absolute hidden group-hover:grid grid-cols-4 z-10 w-1/3 bg-zinc-700'>
            {
              years.map(year=>(
                <li className='hover:bg-slate-700 px-3' onClick={()=>handleSingleChange('year',year)} key={year}>{year}</li>
              ))
            }
          </ul>
        </li>
        <li className='group w-full h-8 bg-zinc-600 hover:bg-slate-800 cursor-pointer'>
          <button className='w-full h-8'>Status</button>
          <ul className='absolute hidden group-hover:block z-10 w-64 bg-zinc-700'>
            {
              status.map(statusAnime=>(
                <li className='hover:bg-slate-700 px-3' onClick={()=>handleSingleChange('statusAnime',statusAnime)} key={statusAnime}>{statusAnime}</li>
              ))
            }
          </ul>
        </li>
        <li className='group w-full h-8 bg-zinc-600 hover:bg-slate-800 cursor-pointer'>
          <button className='w-full h-8'>Country</button>
          <ul className='absolute hidden group-hover:block z-10 w-64 bg-zinc-700'>
            {
              country.map(region=>(
                <li className='hover:bg-slate-700 px-3' onClick={()=>handleSingleChange('region',region)} key={region}>{region}</li>
              ))
            }
          </ul>
        </li>
        <li className='group w-full h-8 bg-zinc-600 hover:bg-slate-800 cursor-pointer'>
          <button className='w-full h-8'>Season</button>
          <ul className='absolute hidden group-hover:block z-10 w-64 bg-zinc-700'>
            {
              season.map(seasonAnime=>(
                <li className='hover:bg-slate-700 px-3' onClick={()=>handleSingleChange('seasonAnime',seasonAnime)} key={seasonAnime}>{seasonAnime}</li>
              ))
            }
          </ul>
        </li>
        <li className='group w-full h-8 bg-zinc-600 hover:bg-slate-800 cursor-pointer'>
          <button className='w-full h-8'>Sorting</button>
          <ul className='absolute hidden group-hover:block z-10 w-64 bg-zinc-700'>
            {
              sort.map(sortAnime=>(
                <li className='hover:bg-slate-700 px-3' onClick={()=>handleArrayChange('sorting',sortAnime)} key={sortAnime}>
                  <input type="checkbox" name={sortAnime} id={sortAnime} />
                  <label htmlFor={sortAnime}>{sortAnime}</label>
                </li>
              ))
            }
          </ul>
        </li>
        <li className='group w-full h-8 bg-zinc-600 focus:outline-black hover:bg-slate-800 cursor-pointer'>
          <button className='w-full h-8' onClick={() =>handleSingleChange('isAdult',isAdult)}>
            isAdult
          </button>
        </li>
        <li className='group w-full h-8 hover:text-zinc-300 text-slate-500 font-bold bg-zinc-300 hover:bg-slate-800 cursor-pointer'>
          <button className='w-full h-8'>Filter</button>
        </li>
      </ul>
      <Anime title='Filtering Anime' searchParams={searchParams} />
      </div>
  )
}

export default AnimeFilter