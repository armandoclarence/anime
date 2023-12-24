import React from 'react'
import { useNavigate, Link, NavLink, useParams } from 'react-router-dom'

function ButtonEpisode({id,number}) {
  const navigate = useNavigate()
  const params = useParams()
  console.log(id)
  const handleRoute = (id) =>{
    navigate(`/anime/${params.id}/${id}`);
  }
  return (
    <button onClick={()=> handleRoute(id)} id={id} className='ml-2'>{number}</button>
  )
}

export default ButtonEpisode