import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovieList, searchMovie, getMovieDetails } from "./api";
import MovieCard from "./movieCard";
import MovieDetails from "./movieDetails";
import Logo from "../src/img/logo.png";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const search = async (q) => {
    if (q.length > 3) {
      const searchResults = await searchMovie(q);
      setPopularMovies(searchResults.results);
    } else {
      getMovieList().then((result) => {
        setPopularMovies(result);
      });
    }
  };
  return (
    <div className=" bg-slate-400">
      <div className="container">
        <div className="row">
          <div className="col-12 text-regal-blue pb-10 px-4">
            <div className="flex justify-start items-center mb-4 bg-black/80 ">
              <div className="rounded-full ">
                <img src={Logo} alt="logo" className=" w-36 h-28" />
              </div>
              <div className=" lg:w-1/4 sm:w-1/3">
                <h1 className="font-bold text-2xl">MovieKu</h1>
                <div>
                  <form className="flex sm:justify-center items-center my-2 ">
                    <input
                      type="text"
                      className=" px-2 w-3/4 lg:w-full sm:w-3/4 rounded-md text-black"
                      onChange={({ target }) => search(target.value)}
                    />
                  </form>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mx-auto gap-4">
              {popularMovies.map((movie) => (
                <Link to={`/movie-details/${movie.id}`}>
                  <MovieCard key={movie.id} movie={movie} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
