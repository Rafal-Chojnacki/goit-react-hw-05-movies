import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import css from './home.module.css';


export const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

 useEffect(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/trending/movie/day?api_key=e7c806d7ce9bbdf1ef93bebcabbfe0f1',
          {
            headers: {
              Accept: 'application/json',
            },
          }
        );
        const data = await response.json();
        setTrendingMovies(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <ul className={css.listOfMovies}>
        {trendingMovies.map(movie => (
          <li className={css.movieElement} key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
