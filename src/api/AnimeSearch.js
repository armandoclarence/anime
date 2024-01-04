import axios from "axios";

export const AnimeSearch = async ( search) => {
  const title = search.get('title') || ''
  const year = search.get('year') || ''
  const seasonAnime = search.get('seasonAnime') || ''
  const statusAnime = search.get('statusAnime') || ''
  const isAdult = search.get('isAdult') === 'true';
  const type = search.get('type') || ''
  const region = search.get('region') || ''
  const genre = search.get('genre') ? search.get('genre').split(',').map(genre => genre.trim()) : '';
  const sorting = search.get('sorting') ? search.get('sorting').split(',').map(sortItem => sortItem.trim()) : '';
  const p = search.get('p') || ''
  try {
    const requestData = {
      type: "ANIME",
      search: title,
      seasonYear: year,
      status: statusAnime,
      season: seasonAnime,
      isAdult: isAdult,
      format: type,
      genres: genre,
      sort: sorting,
      countryOfOrigin: region,
      size: "28",
      page: p
    }
    const filteredRequestData = Object.fromEntries(
      Object.entries(requestData).filter(([_, value]) => value !== "" && value !== null)
    );
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const response = await axios.post(`${baseUrl}/search`,filteredRequestData);
    const { data:{pageInfo,results} } = response;
    return {
      pageInfo: pageInfo,
      results: results
    }
  } catch (e) {
    console.error(e);
    // Handle errors if needed
    return {
      error: e.message
    };
  }
};
