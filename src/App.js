// App.js
import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./home";
import MovieDetails from "./movieDetails";

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie-details/:movieId" element={<MovieDetails />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
