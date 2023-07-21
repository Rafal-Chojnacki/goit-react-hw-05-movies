import { Routes, Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import css from 'app.module.css'
import { Home } from './Home';
import { Movies } from './Movies';
import { MoviesDetails } from './MovieDetails';



const StyledLink = styled(NavLink)`
  color: black;

  &.active {
    color: orange;
  }
`;

export const App = () => {
  return (
    <div>
      <header className={css.header}>
        <nav className={css.homeNav}>
          <StyledLink className={css.homeLink} to="/" end>
            Home
          </StyledLink>
          <StyledLink className={css.homeLink} to="/movies">
            Movies
          </StyledLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MoviesDetails />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};