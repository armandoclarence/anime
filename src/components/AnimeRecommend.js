import React from 'react'

function AnimeRecommend({recommend}) {
  /*
    id 
    title:romaji|english
    format
    episodes
    coverImage:medium
  */
  return (
    <div>
      <h2 className='uppercase'>Recommended</h2>
      <div className='flex flex-col justify-center'>
        {
          recommend?.map(res=>{
            const {id,title:{romaji,english},format,episodes,coverImage:{medium}} = res
            return (
              <div className='flex' key={id}>
                <img src={medium} alt={english||romaji} />
                <div className="flex flex-col align-center justify-center">
                  <h3>{english || romaji}</h3>
                  <div className="flex">
                    <span>{format}</span>
                    <span>{episodes}</span>
                    <span>{episodes}</span>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AnimeRecommend
