import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ButtonEpisode({id,number}) {
  const navigate = useNavigate()
  const params = useParams()
  const handleRoute = (id) =>{
    navigate(`/anime/${params.id}/${id}`);
  }
  return (
    <button onClick={()=> handleRoute(id)} id={id} className='ml-2'>{number}</button>
  )
}

export default ButtonEpisode