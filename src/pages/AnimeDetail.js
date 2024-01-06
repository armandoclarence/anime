import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AnimeResponse } from '../api/AnimeResponse'
import AnimeRecommend from '../components/AnimeRecommend'
import AnimeStream from '../components/AnimeStream'
import ButtonEpisode from '../components/ButtonEpisode'

function AnimeDetail() {
  const {id,ep} = useParams()
  const navigate = useNavigate()
  const [animeData, setAnimeData] = useState(null)
  const [animeEpisode, setAnimeEpisode] = useState(null)
  const [animeRecommend, setAnimeRecommend] = useState(null)
  useEffect(()=>{
    const fetchData = async() =>{
      console.log(ep)
      const episodeAnime = await AnimeResponse({src:'episode/',id})
      setAnimeEpisode({episodeAnime: episodeAnime?.episodes})
      if (ep === undefined) {
        const newUrl = `/anime/${id}/${episodeAnime.episodes[0].id}`;
        window.history.replaceState({ path: newUrl }, '', newUrl);
        navigate(newUrl)
      }
      const infoAnime = await AnimeResponse({src:'info/',id})
      const recommendations = await AnimeResponse({src: 'recommendations/',id})
      setAnimeRecommend({recommendAnime: recommendations?.results})
      setAnimeData({infoAnime: infoAnime?.infoAnime})
    }
    fetchData()
    return () =>{
      console.log('a')
    }
  },[id,navigate,ep])
  const createMarkup = (content) => {
    return { __html: content };
  };
  return (
    <>
      <div className='flex overflow-x-clip gap-3 justify-between bg-slate-950 text-white'>
        <div className='flex w-3/4 flex-col'>
          <AnimeStream poster={animeData?.infoAnime?.bannerImage} id={ep}/>
          <div className='grid grid-cols-3'>
            {animeData?.infoAnime && 
              (()=>{
                const {coverImage:{large},description,duration,episodes,format,genres,score:{decimalScore},season,status,studios,title:{english,romaji},year} = animeData.infoAnime
                const genre = genres.map(genre=>genre).join(', ')
                const studio = studios.map(({name})=>name).join(', ')
                return (
                  <>
                    <img src={large} alt={english || romaji} />
                    <span>{format}</span>
                    <p dangerouslySetInnerHTML={createMarkup(description)} />
                    <span>Type: {format}</span>
                    <p>Premiered: {season} {year}</p>
                    <p>Status: {status}</p>
                    <span>Duration: {duration}</span>
                    <p>Studios: {studio}</p>
                    <p>Rate: {decimalScore}</p>
                    <p>Episodes: {episodes}</p>
                    <p>Genre: {genre}</p>
                  </>
                )
              })()
            }
          </div>
          <div className='grid justify-between gap-2 grid-cols-[repeat(15,minmax(2rem,1fr))]'>
            {
              animeEpisode?.episodeAnime.map(({id,number})=>{
                return <ButtonEpisode key={id} id={id} number={number} />
              })
            }
          </div>
        </div>
        <AnimeRecommend recommend={animeRecommend?.recommendAnime} />
      </div>
    </>
  )
}

export default AnimeDetail