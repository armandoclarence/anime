import axios from "axios";

export const AnimeSearch = async ( {title = '',year = '',genres = '',statusAnime = '',seasonAnime = '',isAdult = '',type = '',region = '',sorting = ''}) => {
  try {
    const requestData = {
      type: "ANIME",
      search: title,
      seasonYear: year,
      status: statusAnime,
      season: seasonAnime,
      isAdult: isAdult,
      format: type,
      genres: genres,
      sort: sorting,
      countryOfOrigin: region,
      size: "28"
    }
    console.log(requestData)
    const filteredRequestData = Object.fromEntries(
      Object.entries(requestData).filter(([_, value]) => value !== "" && value !== null)
    );
    console.log(filteredRequestData)
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
