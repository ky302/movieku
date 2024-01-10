// MovieDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieVideos } from "./api";

function MovieDetails() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieVideos, setMovieVideos] = useState(null);

  // Inside the useEffect in MovieDetails.js
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (!movieId) {
          // Handle the case where movieId is undefined (e.g., show an error message)
          return;
        }

        const details = await getMovieDetails(movieId);
        setMovieDetails(details);
        console.log({ details });
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchMovieVideos = async () => {
      try {
        const videos = await getMovieVideos(movieId);
        setMovieVideos(videos);
      } catch (error) {
        console.error("Error fetching movie videos:", error);
      }
    };

    fetchMovieDetails();
    fetchMovieVideos();
  }, [movieId]);

  if (!movieDetails || !movieVideos) {
    return <div>Loading...</div>;
  }

  const {
    title,
    overview,
    release_date,
    vote_average,
    poster_path,
    genres,
    runtime,
  } = movieDetails;

  return (
    <div className=" bg-slate-400 lg:p-10 sm:p-0 pb-8">
      <div className=" lg:grid lg:grid-cols-3 lg:px-8 ">
        <div className="flex">
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={`${title} Poster`}
            className=" w-80 mx-auto rounded-md m-4 lg:m-0 sm:m-4"
          />
        </div>
        <div className="lg:flex bg-orange-50/50 py-8 sm:py-8 lg:p-6 rounded-md col-span-2 start-2 flex-col">
          <div className=" space-y-1 px-8">
            <h2 className=" text-2xl font-bold text-sky-900 mb-10">{title}</h2>

            <div className=" font-bold">
              <p>
                Release Date:{" "}
                <span className="text-red-700">
                  {new Date(release_date).toLocaleDateString()}
                </span>
              </p>
              <p>
                Runtime:{" "}
                <span className="font-semibold">{runtime} minutes</span>
              </p>
              <p>
                Genres:{" "}
                <span className="font-semibold">
                  {genres.map((genre) => genre.name).join(", ")}
                </span>
              </p>
              <p>
                Average Rating:
                <span className="font-semibold"> {vote_average}</span>
              </p>
            </div>

            <p className=" font-semibold text-justify pt-8">{overview}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        {movieVideos.results && movieVideos.results.length > 0 && (
          <div className="text-center">
            <div className="text-2xl font-bold mt-10 mb-8 flex flex-col justify-center items-center">
              <h3 className="  uppercase text-sky-900  ">Movie Videos</h3>
              <div className="h-1 w-40 bg-orange-1400  rounded-md mt-4"></div>
            </div>

            <ul className="grid lg:grid-cols-3 sm:grid-cols-1 gap-8 justify-stretch items-center ">
              {movieVideos.results.map((video) => (
                <li key={video.key}>
                  <div className="flex justify-center">
                    <iframe
                      className="rounded-md"
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title={`YouTube Video: ${video.name}`}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
