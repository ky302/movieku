import axios from "axios";

const apiUrl = process.env.REACT_APP_BASEURL;
const apiKey = process.env.REACT_APP_APIKEY;
const token = process.env.REACT_APP_TOKEN;

export const getMovieList = async () => {
  const movie = await axios.get(
    `${apiUrl}/movie/popular?page=1&api_key=${apiKey}`
  );
  // console.log({ movieList: movie.data.results });
  return movie.data.results;
};

export const searchMovie = async (q) => {
  const search = await axios.get(
    `${apiUrl}/search/movie?api_key=${apiKey}&page=1&query=${q}`
  );
  return search.data;
};

// Movie Details
export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(
      `${apiUrl}/movie/${movieId}?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error; // Rethrow the error to propagate it to the calling component
  }
};

// Movie Videos
export const getMovieVideos = async (movieId) => {
  try {
    const response = await axios.get(
      `${apiUrl}/movie/${movieId}/videos?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    throw error; // Rethrow the error to propagate it to the calling component
  }
};
