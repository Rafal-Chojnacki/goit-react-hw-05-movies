import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import css from './movieDetails.module.css';

export const MoviesDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=e7c806d7ce9bbdf1ef93bebcabbfe0f1&language=en-US`
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const navigate = useNavigate();

  const goBack = () => {
    navigate('/'); // Navigate to the Home page
  };

  const getYearFromDate = dateString => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  console.log(movieDetails);
  return (
    <div>
      <div>
        <button className={css.goBackBtn} onClick={goBack}>
          Go Back
        </button>
      </div>
      <div className={css.movieDetailsBox}>
        <div>
          {movieDetails && (
            <img
              className={css.moviePoster}
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
          )}
        </div>

        {movieDetails ? (
          <div className={css.movieInfo}>
            <h3>
              {movieDetails.title} ({getYearFromDate(movieDetails.release_date)})
            </h3>
            <p>Popularity : {movieDetails.popularity}</p>
            <p>{movieDetails.overview}</p>
            {/* Display genres */}
            <p>Genres: {movieDetails.genres.map(genre => genre.name).join(", ")}</p>
            {/* Add more movie details as needed */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
