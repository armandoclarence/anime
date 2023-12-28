import axios from "axios";

export const AnimeResponse = async ({ src, query = '' }) => {
  try {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const response = await axios.get(`${baseUrl}/${src}${query?`?${query}`: ''}`);
    const { data } = response;
    return {
      results : data, 
      streamData : data?.stream
    }
  } catch (e) {
    console.error(e);
    // Handle errors if needed
    return {
      error: e.message
    };
  }
};
