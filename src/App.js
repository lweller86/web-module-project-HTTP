import React, { useEffect, useState } from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import AddMovie from "./components/AddMovie";

import MovieHeader from './components/MovieHeader';

import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';
import EditMovieForm from "./components/EditMovieForm";
import { baseURL } from "./Utils";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);


  console.log(favoriteMovies)
  useEffect(() => {
    axios.get(baseURL)
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {

    setMovies(movies.filter(item => (item.id !== id)));

  }

  const addToFavorites = (favoriteMovie) => {
    const findMovie = (favoriteMovies.find(item => favoriteMovie.id === item.id));
    if (!findMovie) setFavoriteMovies([...favoriteMovies, favoriteMovie]);
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Routes>
            <Route
              path="movies/edit/:id"
              element={<EditMovieForm
                setMovies={setMovies} />}
            />

            <Route
              path="movies/:id"
              element={<Movie deleteMovie={deleteMovie}
                addToFavorites={addToFavorites} />}
            />

            <Route
              path="movies"
              element={<MovieList movies={movies} />}
            />

            <Route
              path="movies/add"
              element={<AddMovie movies={movies} setMovies={setMovies} />}
            />

            <Route
              path="/"
              element={<Navigate to="/movies" />}
            />

          </Routes>
        </div>
      </div>
    </div>
  );
};


export default App;
