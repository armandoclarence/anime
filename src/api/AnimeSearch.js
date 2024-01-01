import axios from "axios";

export const AnimeSearch = async ( search = '') => {
  try {
    console.log(search)
    const requestData = {
      type: "ANIME",
      search: title,
      seasonYear: year,
      status: status,
      season: season,
      isAdult: isAdult,
      format: format,
      genres: genres,
      sort: sort,
      countryOfOrigin: country,
      size: "28"
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
