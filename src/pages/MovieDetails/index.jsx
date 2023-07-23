import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link, NavLink } from 'react-router-dom';
import { Outlet, useNavigate } from 'react-router';
import styled from 'styled-components';
import css from './movieDetails.module.css';

const StyledLink = styled(NavLink)`
  color: black;

  &.active {
    color: orange;
  }
`;

export const MoviesDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation(); // Get the location object

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
    navigate(-1);
  };

  const getYearFromDate = dateString => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

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
            <h1>
              {movieDetails.title} ({getYearFromDate(movieDetails.release_date)}
              )
            </h1>
            <p>Popularity: {movieDetails.popularity}</p>
            <h2>Overview</h2>
            <p>{movieDetails.overview}</p>
            <h3>Geners</h3>
            <p>{movieDetails.genres.map(genre => genre.name).join(', ')}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {location.state && location.state.movies && (
        <div>
          <h2>Search Results:</h2>
          <ul className={css.listOfMovies}>
            {location.state.movies.map(movie => (
              <li className={css.movieElement} key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <nav className={css.homeNav}>
        <ul className={css.addInfoBox}>
          <li>
            <StyledLink
              className={css.homeLink}
              to={{
                pathname: `/movies/${id}/cast`,
              }}
            >
              Cast
            </StyledLink>
          </li>
          <li>
            <StyledLink
              className={css.homeLink}
              to={{
                pathname: `/movies/${id}/reviews`,
              }}
            >
              Reviews
            </StyledLink>
          </li>
        </ul>
      </nav>
      <Outlet context={id}/>
    </div>
  );
};
