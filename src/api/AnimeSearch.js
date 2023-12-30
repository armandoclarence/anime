import axios from "axios";

export const AnimeSearch = async ( search ) => {
  try {
    console.log(search.get("sort"))
    console.log(search.get("year"))
    const year = search.get("year")
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const response = await axios.post(`${baseUrl}/search`,{
      "search":"",
      "seasonYear":`${year}`
    });
    const { data:{results} } = response;
    return {
      results : results
    }
  } catch (e) {
    console.error(e);
    // Handle errors if needed
    return {
      error: e.message
    };
  }
};
