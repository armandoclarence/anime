import React from 'react'
import { useParams,NavLink } from 'react-router-dom'

function ButtonEpisode({id,number}) {
  const params = useParams()
  return (
    <NavLink to={`/anime/${params.id}/${id}`} id={id} className='flex justify-center px-6 border border-zinc-300 border-solid'>{number}</NavLink>
  )
}

export default ButtonEpisode