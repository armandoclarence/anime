import axios from "axios";

export const AnimeResponse = async ({ src,id = '', query = '' }) => {
  try {
    if(id === undefined) return
    const baseUrl = process.env.REACT_APP_BASE_URL;
    console.log(query)
    const url = `${baseUrl}/${src ? src : ''}${id}${query.trim() === "" ? '': `?${query}`}`;
    const response = await axios.get(url);
    const {data} = response
    console.log(data)
    console.log(url)
    const {results,episodes,page,stream,pageInfo} = data;
    if(src === 'schedule/'){
      const res = data;
      console.log(res)
    }
    if(src === 'episode/') {
      return {
        episodes: episodes
      }
    }if(src === 'info/') {
      return {
        infoAnime: data
      }
    }if(src === 'stream/'){
      return { 
        streamData : stream
      }
    }
    return {
      results : results,
      pageInfo : page || pageInfo
    }
  } catch (e) {
    console.error(e);
    // Handle errors if needed
    return {
      error: e.message
    };
  }
};
