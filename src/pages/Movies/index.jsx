import React from "react";
import css from "./movies.module.css";

export const Movies = () => {
  
  return (
    <div>
       <div className={css.moviesFormBox}>
        <form>
            <input className={css.moviesFormInput}>
            </input>
            <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};
