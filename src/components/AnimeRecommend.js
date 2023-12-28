import React from 'react'
import {LiaClosedCaptioning} from 'react-icons/lia'
import { Link } from 'react-router-dom'
import { AnimeResponse } from '../api/AnimeResponse'

function AnimeRecommend({recommend}) {
  const recommendAnime = recommend?.map(async(res)=>{
    const {id} = res
    const {results} = await AnimeResponse({src:`info/${id}`})
    const {id_provider} = results
    return id_provider
  })
  console.log(recommendAnime)
  return (
    <div>
      <h2 className='uppercase'>Recommended</h2>
      <div className='flex flex-col gap-2 justify-center'>
        {
          recommend?.map(res=>{
            const {id,title:{romaji,english},format,episodes,coverImage:{medium}} = res
            return (
              <Link to={`${id}`} className='flex gap-2 bg-slate-700' key={id}>
                <img src={medium} alt={english||romaji} />
                <div className="flex flex-col justify-center">
                  <h3>{english || romaji}</h3>
                  <div className="flex">
                    <span>{format}</span>
                    <div className="flex items-center bg-slate-600">
                      <LiaClosedCaptioning />
                      <span>{episodes}</span>
                    </div>
                    <span className='bg-zinc-700'>{episodes}</span>
                  </div>
                </div>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default AnimeRecommend
