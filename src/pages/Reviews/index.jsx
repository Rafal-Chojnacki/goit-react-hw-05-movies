import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import css from './reviews.module.css';
import { BsPersonCircle } from 'react-icons/bs'; // Assuming you have imported the BsPersonCircle icon from the react-icons library.

export const Reviews = () => {
  const [movieReviews, setMovieReviews] = useState([]);
  const id = useOutletContext();

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=e7c806d7ce9bbdf1ef93bebcabbfe0f1&language=en-US`
        );
        const data = await response.json();
        setMovieReviews(data.results);
        console.log(data);
      } catch (error) {
        console.error('Error fetching movie reviews:', error);
      }
    };

    fetchMovieReviews();
  }, [id]);

  return (
    <div>
      <div>
        <h2>Reviews</h2>
      </div>
      <div className={css.reviewsBox}>
        {movieReviews.map((review) => (
          <div key={review.id}>
            <ul className={css.listOfReviews}>
              <li className={css.reviewElement}>
                <p className={css.authorName}>{review.author}</p>
                <p className={css.reviewContent}>{review.content}</p>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
