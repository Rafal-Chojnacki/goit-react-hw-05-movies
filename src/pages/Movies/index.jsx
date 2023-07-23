import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import css from './movies.module.css';

export const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem('searchResults')) || []
  );
  const navigate = useNavigate();

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
      localStorage.setItem('searchResults', JSON.stringify(data.results));
      navigate('/movies'); // Redirect to the Movies component
    } catch (error) {
      console.error('Error fetching movie data:', error);
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
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { movies }, // Pass the movies array to MoviesDetails component
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
