import axios from "axios";

export const AnimeSearch = async ( search ) => {
  try {
    console.log(search)
    const title = search.get("keyword") || ''
    const year = search.get("year") || ''
    const season = search.get("season") || ''
    const isAdult = search.get("isAdult") || ''
    const format = search.get("format") || ''
    const genres = (search.get("genres").split(',') || '') ? search.get("genres").split(',') :search.get("genres")
    // const tags = search.get("tags").split(',') ? search.get("tags").split(',') : search.get("tags")
    // const sort = search.get("sort").split(',') ? search.get("sort").split(',') : search.get("sort")
    const requestData = {
      type: "ANIME",
      search: title,
      seasonYear: year,
      season: season,
      isAdult: isAdult,
      format: format,
      genres: genres,
      // tags: tags,
      // sort: sort
    }
    const filteredRequestData = Object.fromEntries(
      Object.entries(requestData).filter(([_, value]) => value !== "" && value !== null)
    );
    console.log(filteredRequestData)
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const response = await axios.post(`${baseUrl}/search`,filteredRequestData);
    console.log(response)
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
