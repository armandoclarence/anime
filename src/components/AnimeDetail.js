import { useEffect, useState } from 'react';
import { AnimeResponse } from '../api/AnimeResponse';

function AnimeDetail({id}) {
  const [animeData, setAnimeData] = useState(null)
  useEffect(()=>{
    const fetchData = async()=>{
      try {
        // Correct the usage of AnimeResponse and remove unnecessary destructuring
        const anime = await AnimeResponse({ src: `info/${id}` });
        console.log(anime);
        setAnimeData(anime);
      } catch (error) {
        console.error('Error fetching anime data:', error);
      }
    }
    fetchData()
  },[id])
  return (
    <div>
      {
        animeData?.results.map(res=>{
          console.log(res)
        })
      }
    </div>
  )
}

export default AnimeDetail