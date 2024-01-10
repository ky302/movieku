import React from "react";

const MovieCard = ({ movie }) => {
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.it/375x550";
  const truncateOverview = (overview, maxLength) => {
    return overview.length > maxLength
      ? `${overview.slice(0, maxLength)}...`
      : overview;
  };
  return (
    <div className="bg-orange-50/50 border border-black rounded-lg text-center">
      <div className=" p-1 m-1 w-auto rounded-md text-sm mb-2 flex justify-start bg-orange-1400/40 ">
        <span className="text-black font-semibold">{movie.release_date}</span>
      </div>
      <div className="card flex flex-col justify-center items-center">
        <img
          src={posterPath}
          className="card-img-top w-1/2 shadow-lg"
          alt={movie.title}
        />
        <div className="card-body px-1 text-sky-900 pt-2">
          <a
            href={movie.link}
            className="group-hover:text-cyan-700 font-bold text-lg line-clamp-2"
          >
            {truncateOverview(movie.title, 20)}
          </a>

          <div className=" text-red-950 text-left px-2 mb-1 rounded-md border border-regal-blue bg-orange-1400/40">
            <span className="line-clamp-4 py-2 text-sm  leading-relaxed">
              {truncateOverview(movie.overview, 100)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
