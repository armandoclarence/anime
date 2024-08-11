import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import Anime from '../components/Anime'
import {genres,years,season,country,format,status,sort} from '../data/arrayAnime'

function AnimeFilter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const componentRef = useRef(null)
  const [isAdult, setIsAdult] = useState(false)
  const [activeItem, setActiveItem] = useState(null);
  const [filter, setFilter] = useState({
    title : searchParams.get('title') || '',
    'genre' : searchParams.get('genre') ? searchParams.get('genre').split(',') : [],
    year : searchParams.get('year') || '',
    seasonAnime : searchParams.get('seasonAnime') || '',
    statusAnime : searchParams.get('statusAnime') || '',
    type : searchParams.get('type') ? searchParams.get('type').split(',') : [],
    region : searchParams.get('region') || '',
    'sorting' : searchParams.get('sorting') || '',
    p : searchParams.get('p') ?? '1',
    isAdult : isAdult
  })
  
  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setActiveItem(null);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const handleInputChange = (event) => {
    setFilter((prevFilter)=>({...prevFilter,title:event.target.value}))
    setSearchParams({...filter,title:event.target.value,genre:filter['genre'].join(','),type:filter['type'].join(',')})
  }

  const handleSingleChange = (key,value) =>{
    if(key === 'isAdult') setIsAdult((prevIsAdult)=>!prevIsAdult)
    setFilter((prevFilter)=>({...prevFilter,[key]:value}))
    setSearchParams(({...filter,[key]:value,type:filter['type'].join(','),genre:filter['genre'].join(',')}))
  }

  const handleHidden = (itemName)=>{
    setActiveItem((prevActiveItem) =>
      prevActiveItem === itemName ? null : itemName
    );
  }

  const isItemActive = (itemName) => activeItem === itemName;
  const handleArrayChange = (arr, value) => {
    setFilter((prevFilter)=>{
      const newArray = [...prevFilter[arr]]
      console.log(newArray)
      const isValueInArray = newArray.includes(value);
      const updatedArray =  isValueInArray
      ? newArray.filter((item) => item !== value)
      : [...newArray, value];
      const t = arr === 'genre' ? 'type' : 'genre'
      const updatedArrays = {
        [arr]: updatedArray.join(','),
        [t]: prevFilter[t].join(',')
      }
      const updatedParams = {...prevFilter, ...updatedArrays };
      console.log(prevFilter)
      console.log(t)
      setSearchParams(() => {
        return updatedParams;
      });
      return { ...prevFilter, [arr]: updatedArray };
    })
  };
  return (
    <div className='text-[#D9D9D9] px-2'>
      <ul key='Filtering' className="grid grid-cols-5 gap-2 *:bg-[#303030] *:cursor-pointer py-4" ref={componentRef}>
        <li className='h-8 hover:bg-slate-800 text-black'>
          <input className='w-full h-8 placeholder:text-[#D6D6D6] text-[#D6D6D6] bg-[#1C313F]' type="text" placeholder="Search Anime..." value={searchParams.get('title') || ''} onChange={(e)=>handleInputChange(e)} />
        </li>
        <li className='group w-full h-8 hover:bg-slate-800'>
          <button className='w-full h-8 focus:bg-slate-700' onClick={()=>handleHidden(0)}>{filter.type.length<=2 ? searchParams.get('type') || 'Type' : `${filter.type.length} selected`}</button>
          {
            isItemActive(0) && (
              <ul className='absolute focus:block z-10 w-64 bg-zinc-700'>
                {
                  format.map(({type, code})=>(
                    <li className='w-full flex px-2 hover:bg-slate-700' key={type}>
                      <input className='cursor-pointer pl-2' defaultChecked={searchParams.get('type').includes(code)} type="checkbox" onChange={()=>handleArrayChange('type',code)} name={type} id={code} />
                      <label className='w-full pl-2' htmlFor={code}>{type}</label>
                    </li>
                  ))
                }
              </ul>
            )
          }
        </li>
        <li className='group w-full h-8 hover:bg-slate-800'>
          <button className='w-full h-8 focus:outline-none focus:bg-slate-800' onClick={()=>handleHidden(1)}>{filter['genre'].length<=2 ? searchParams.get('genre') || 'Genre': `${filter['genre'].length} selected`}</button>
          {
            isItemActive(1) && (
              <ul className='absolute grid-cols-4 grid z-10 w-1/3 bg-zinc-700'> 
                {
                  genres.map(genre=>(
                    <li className='w-full flex px-2' key={genre}>
                      <input className='cursor-pointer pl-2' defaultChecked={searchParams.get('genre').includes(genre)} type="checkbox" onClick={()=>handleArrayChange('genre',genre)} readOnly name={genre} id={genre} />
                      <label className='w-full pl-2' htmlFor={genre}>{genre}</label>
                    </li>
                  ))
                }
              </ul>
            )
          }
        </li>
        <li className='group w-full h-8 hover:bg-slate-800'>
          <button className='w-full h-8 focus:bg-slate-700' onClick={()=>handleHidden(2)}>{searchParams.get('year') || 'Year'}</button>
          {
            isItemActive(2) && (
              <ul className='absolute grid group-hover:grid grid-cols-4 z-10 w-1/3 bg-zinc-700'>
                {
                  years.map(year=>(
                    <li className='px-3' key={year}>
                      <input type="radio" id={`y_${year}`} onClick={()=>handleSingleChange('year',year)} name="seasonYear" className="hidden"/>
                      <label htmlFor={`y_${year}`} className="flex items-center cursor-pointer">
                        <div className="w-4 h-4 border border-gray-400 rounded-full mr-2 flex items-center justify-center">
                          <div className={`hidden radio-check text-white font-bold`}>✔</div>
                        </div>
                        <span>{year}</span>
                      </label>
                    </li>
                  ))
                }
              </ul>
            )
          }
        </li>
        <li className='group w-full h-8 hover:bg-slate-800'>
          <button className='w-full h-8 focus:bg-slate-700' onClick={()=>handleHidden(3)}>{
            searchParams.get('statusAnime') || 'Status'
          }</button>
          {
            isItemActive(3) && (
              <ul className='absolute group-hover:block z-10 w-64 bg-zinc-700'>
                {
                  status.map(({statusAnime,code})=>(
                    <li className='px-3' key={statusAnime}>
                      <input type="radio" id={code} onClick={()=>handleSingleChange('statusAnime',code)} name="statusAnime" className="hidden"/>
                      <label htmlFor={code} className="flex items-center cursor-pointer">
                        <div className="w-4 h-4 border border-gray-400 rounded-full mr-2 flex items-center justify-center">
                          <div className={`${searchParams.get('statusAnime').includes(code) ? '':'hidden'} radio-check text-white font-bold`}>✔</div>
                        </div>
                        <span>{statusAnime}</span>
                      </label>
                    </li>
                  ))
                }
              </ul>
            )
          }
        </li>
        <li className='group w-full h-8 hover:bg-slate-800'>
          <button className='w-full h-8 focus:bg-slate-700' onClick={()=>handleHidden(4)}>{searchParams.get('region') || 'Country'}</button>
          {
            isItemActive(4) && (
              <ul className='absolute group-hover:block z-10 w-64 bg-zinc-700'>
                {
                  country.map(({region,code})=>(
                    <li className='w-full flex px-2' key={region}>
                      <input type="radio" id={code} onClick={()=>handleSingleChange('region',code)} name="region" className="hidden"/>
                      <label htmlFor={code} className="flex w-full items-center cursor-pointer">
                        <div className="w-4 h-4 border border-gray-400 rounded-full mr-2 flex items-center justify-center">
                          <div className={`${searchParams.get('region').includes(code) ? '':'hidden'}  radio-check text-white font-bold`}>✔</div>
                        </div>
                        <span>{region}</span>
                      </label>
                    </li>
                  ))
                }
              </ul>
            )
          }
        </li>
        <li className='group w-full h-8 hover:bg-slate-800'>
          <button className='w-full h-8 focus:bg-slate-700' onClick={()=>handleHidden(5)}>{
          searchParams.get('seasonAnime') || 'Season'
          }</button>
          {
            isItemActive(5) && (
              <ul className='absolute group-hover:block z-10 w-64 bg-zinc-700'>
                {
                  season.map(({seasonAnime,code})=>(
                    <li className='px-3' key={seasonAnime}>
                      <input type="radio" id={code} onClick={()=>handleSingleChange('seasonAnime',code)} name="seasonAnime" className="hidden"/>
                      <label htmlFor={code} className="flex items-center cursor-pointer">
                        <div className="w-4 h-4 border border-gray-400 rounded-full mr-2 flex items-center justify-center">
                          <div className={`${searchParams.get('seasonAnime').includes(code) ? '':'hidden'} radio-check text-white font-bold`}>✔</div>
                        </div>
                        <span>{seasonAnime}</span>
                      </label>
                    </li>
                  ))
                }
              </ul>
            )
          }
        </li>
        <li className='group w-full h-8 hover:bg-slate-800'>
          <button className='w-full h-8 focus:bg-slate-700' onClick={()=>handleHidden(6)}>{
          searchParams.get('sorting') || 'Sorting'
          }</button>
          {
            isItemActive(6) && (
              <ul className='absolute group-hover:block z-10 w-64 bg-zinc-700'>
                {
                  sort.map(({sortAnime,code})=>(
                    <li className='px-3' key={sortAnime}>
                      <input type="radio" id={sortAnime} onClick={()=>handleSingleChange('sorting',code)} name="sortAnime" className="hidden"/>
                      <label htmlFor={sortAnime} className="flex items-center cursor-pointer">
                        <div className="w-4 h-4 border border-gray-400 rounded-full mr-2 flex items-center justify-center">
                        <div className={`${searchParams.get('sorting').includes(code) ? '':'hidden'}  radio-check text-white font-bold`}>✔</div>
                        </div>
                        <span>{sortAnime}</span>
                      </label>
                    </li>
                  ))
                }
              </ul>
            )
          }
        </li>
        <li className='group w-full h-8 focus:outline-black hover:bg-slate-800'>
          <button className='w-full h-8' onClick={() =>handleSingleChange('isAdult',isAdult)}>
            isAdult : {searchParams.get('isAdult')}
          </button>
        </li>
      </ul>
      <Anime key='AnimeList' title='Filtering Anime' searchParams={searchParams} />
    </div>
  )
}

export default AnimeFilter