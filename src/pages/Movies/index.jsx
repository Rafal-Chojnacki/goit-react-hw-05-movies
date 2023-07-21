import React, { useState } from "react";
import { Link } from "react-router-dom";
import css from "./movies.module.css";

export const Movies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=e7c806d7ce9bbdf1ef93bebcabbfe0f1&query=${searchQuery}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  return (
    <div>
      <div className={css.moviesFormBox}>
        <form onSubmit={handleSubmit}>
          <input
            className={css.moviesFormInput}
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div>
        <h2>Search Results:</h2>
        <ul className={css.listOfMovies}>
          {movies.map((movie) => (
            <li className={css.movieElement} key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
