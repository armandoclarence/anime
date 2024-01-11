import { useState } from 'react'
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
    type : searchParams.get('type') ? searchParams.get('type').split(',') : [],
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
    const newArray = [...filter[arr]]
    const isValueInArray = newArray.includes(value);

    if (isValueInArray) {
      const updatedArray = filter[arr].filter(item => item !== value);
      setFilter(prevFilter=>{
        return {...prevFilter,[arr]:updatedArray}
      })
      setSearchParams({...filter,[arr]:updatedArray.join(',')})
    } else {
      const updatedArray = [...filter[arr], value];
      setFilter(prevFilter=>{
        return {...prevFilter,[arr]:updatedArray}
      })
      setSearchParams({...filter,[arr]:updatedArray.join(',')})
    }
  };
    

  return (
    <div className='text-[#D9D9D9] px-2'>
      <ul key='Filtering' className="grid grid-cols-5 gap-2 *:bg-[#303030] *:cursor-pointer pb-3">
        <li className='h-8 hover:bg-slate-800 text-black'>
          <input className='w-full h-8 placeholder:text-[#D6D6D6] text-[#D6D6D6] bg-[#1C313F]' type="text" placeholder="Search Anime..." value={searchParams.get('title') || ''} onChange={(e)=>handleInputChange(e)} />
        </li>
        <li className='group w-full focus-within:visible h-8 hover:bg-slate-800'>
          <button className='w-full h-8'>Type</button>
          <ul className='absolute hidden group-hover:block z-10 w-64 bg-zinc-700'>
            {
              format.map(type=>(
                <li className='hover:bg-slate-700 pl-2' onClick={()=>handleArrayChange('type',type)} key={type}>{type}</li>
              ))
            }
          </ul>
        </li>
        <li className='group w-full h-8 hover:bg-slate-800'>
          <button className='w-full h-8'>Genre</button>
          <ul className='absolute grid-cols-4 hidden group-hover:grid z-10 w-1/3 bg-zinc-700'>
            {
              genres.map(genre=>(
                <li className='hover:bg-slate-700 w-full flex pl-2' key={genre}>
                  <input className='cursor-pointer pl-2' type="checkbox" onClick={()=>handleArrayChange('genre',genre)} readOnly name={genre} id={genre} />
                  <label className='w-full pl-2' htmlFor={genre}>{genre}</label>
                </li>
              ))
            }
          </ul>
        </li>
        <li className='group w-full h-8 hover:bg-slate-800'>
          <button className='w-full h-8'>Year</button>
          <ul className='absolute hidden group-hover:grid grid-cols-4 z-10 w-1/3 bg-zinc-700'>
            {
              years.map(year=>(
                <li className='hover:bg-slate-700 px-3' onClick={()=>handleSingleChange('year',year)} key={year}>{year}</li>
              ))
            }
          </ul>
        </li>
        <li className='group w-full h-8 hover:bg-slate-800'>
          <button className='w-full h-8'>Status</button>
          <ul className='absolute hidden group-hover:block z-10 w-64 bg-zinc-700'>
            {
              status.map(statusAnime=>(
                <li className='hover:bg-slate-700 px-3' onClick={()=>handleSingleChange('statusAnime',statusAnime)} key={statusAnime}>{statusAnime}</li>
              ))
            }
          </ul>
        </li>
        <li className='group w-full h-8 hover:bg-slate-800'>
          <button className='w-full h-8'>Country</button>
          <ul className='absolute hidden group-hover:block z-10 w-64 bg-zinc-700'>
            {
              country.map(({region,code})=>(
                <li className='hover:bg-slate-700 px-3' onClick={()=>handleSingleChange('region',code)} key={code}>{region}</li>
              ))
            }
          </ul>
        </li>
        <li className='group w-full h-8 hover:bg-slate-800'>
          <button className='w-full h-8'>Season</button>
          <ul className='absolute hidden group-hover:block z-10 w-64 bg-zinc-700'>
            {
              season.map(({seasonAnime,code})=>(
                <li className='hover:bg-slate-700 px-3' onClick={()=>handleSingleChange('seasonAnime',code)} key={seasonAnime}>{seasonAnime}</li>
              ))
            }
          </ul>
        </li>
        <li className='group w-full h-8 hover:bg-slate-800'>
          <button className='w-full h-8'>Sorting</button>
          <ul className='absolute hidden group-hover:block z-10 w-64 bg-zinc-700'>
            {
              sort.map(sortAnime=>(
                <li className='hover:bg-slate-700 px-3' key={sortAnime}>
                  <input type="checkbox" onClick={()=>handleArrayChange('sorting',sortAnime)} name={sortAnime} id={sortAnime} />
                  <label htmlFor={sortAnime}>{sortAnime}</label>
                </li>
              ))
            }
          </ul>
        </li>
        <li className='group w-full h-8 focus:outline-black hover:bg-slate-800'>
          <button className='w-full h-8' onClick={() =>handleSingleChange('isAdult',isAdult)}>
            isAdult
          </button>
        </li>
        <li className='group w-full h-8 hover:text-zinc-300 text-[#303030] font-bold bg-zinc-300 hover:bg-slate-800'>
          <button className='w-full h-8'>Filter</button>
        </li>
      </ul>
      <Anime key='AnimeList' title='Filtering Anime' searchParams={searchParams} />
    </div>
  )
}

export default AnimeFilter