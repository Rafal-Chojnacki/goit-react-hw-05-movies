import React, { useEffect, useState } from 'react';
import css from './cast.module.css';
import { useOutletContext } from 'react-router';
import { BsPersonCircle } from 'react-icons/bs';

export const Cast = () => {
  const [movieActors, setMovieActors] = useState([]);
  const id = useOutletContext();
  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=e7c806d7ce9bbdf1ef93bebcabbfe0f1&language=en-US`
        );
        const data = await response.json();
        setMovieActors(data.cast);
        console.log(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieCredits();
  }, [id]);

  return (
    <div>
      <div>
        <h2>Cast</h2>
      </div>
      <div className={css.actorsBox}>
        {movieActors.map(actor => (
          <div key={actor.id}>
            {actor.profile_path ? (
              <ul className={css.listOfActors}>
                <li className={css.movieElement} key={actor.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt={actor.name}
                  />
                  <p className={css.actorName}>{actor.name}</p>
                </li>
              </ul>
            ) : (
              <ul className={css.listOfActors}>
                <li className={css.movieElement} key={actor.id}>
                  <div className={css.emptyImage}>
                  <BsPersonCircle size = '150px' />
                  </div>
                  <div>
                  <p className={css.actorName}>{actor.name}</p>
                  </div>
                  
                </li>
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
