import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const MoviesDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY&language=en-US`
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <div>
      {movieDetails ? (
        <div>
          <h3>{movieDetails.title}</h3>
          <p>{movieDetails.overview}</p>
          <p>Release Date: {movieDetails.release_date}</p>
          {/* Add more movie details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
