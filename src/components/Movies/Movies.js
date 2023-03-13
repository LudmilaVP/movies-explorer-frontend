import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState, useEffect } from 'react';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';

function Movies({isLoggedIn, cards, closeMenu, isMenuOpen, likeCard, removeCard, userId, searchAllMovies, searchMovie, messageForMoviesList, preloader }) {

    const [sliderStatus, setSliderStatus] = useState(false);
    const [movies, setMovies] = useState([]);
  
    function clickSlider() {
      setSliderStatus(!sliderStatus);
      localStorage.setItem('slider', JSON.stringify(!sliderStatus));
      searchMovie(JSON.parse(localStorage.getItem('inputMovie')), JSON.parse(localStorage.getItem('slider')));
      };
  
    function searchinghMovie(data) {
      localStorage.setItem('inputMovie', JSON.stringify(data));
      searchMovie(data, JSON.parse(localStorage.getItem('slider')));
    };
  
    function clickSavedCard(data) {
      const doubledCard = cards.find((item) =>{ return (item.movieId === data.movieId)});
      removeCard(doubledCard._id);
    };
  
    useEffect(()=>{
      searchMovie(JSON.parse(localStorage.getItem('inputMovie')), JSON.parse(localStorage.getItem('slider')));
      setSliderStatus(JSON.parse(localStorage.getItem('slider')) || false)
    },[]);
  
    useEffect(()=>{
      
      setMovies(searchAllMovies)
    },[searchAllMovies]);

    return (
        <>
            <SearchForm searchMovie={searchinghMovie} handleSliderClick={clickSlider} sliderStatus={sliderStatus} inputValues={JSON.parse(localStorage.getItem('inputMovie'))}/>
            <div className="movies__main">
            <Preloader preloader={preloader} />
        <MoviesCardList clickCard={likeCard} removeCard={clickSavedCard} userId={userId} moviesList={movies} messageForMoviesList={messageForMoviesList} cards={cards} />
            </div>
        </>
    );
}

export default Movies;