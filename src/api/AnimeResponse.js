import axios from "axios";

export const AnimeResponse = async ({ src,id = '', query = '' }) => {
  try {
    if(id === undefined) return
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const response = await axios.get(`${baseUrl}/${src}${id}${query?`?${query}`: ''}`);
    const {data} = response
    const {results,episodes,page,stream,pageInfo} = data;
    return {
      infoAnime : data,
      results : results,
      episodes : episodes, 
      streamData : stream,
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
