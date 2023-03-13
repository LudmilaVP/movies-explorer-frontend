import "./SearchForm.css";
import { useEffect, useState } from 'react';

function SearchForm({searchMovie, handleSliderClick, sliderStatus, inputValues}) {

  const [inputValue, setInputValue] = useState('');

  function changeValue(e) {
    setInputValue(e.target.value);
  };

  function submitForm(e) {
    e.preventDefault();
    searchMovie(inputValue);
  };

  useEffect(()=>{
    if(inputValues!==null){
    setInputValue( inputValues );
  }
  },[inputValues]);

  return (
    <section className="search">
      <div className="search__box">
        <form className="search__form">
          <div className="search__icon"></div>
          <input className="search__input" placeholder="Фильм" type="text" onChange={changeValue} value={inputValue} required />
          <button className="search__button" type="submit" onClick={submitForm}></button>
        </form>
        <div className="search__toggle">
          <label className="search__tumbler">
            <input type="checkbox" name="shortFilms" className="search__checkbox" onClickChechbox={handleSliderClick} sliderClick={sliderStatus}/>
            <span className="search__slider" />
          </label>
          <p className="search__films">Короткометражки</p>
        </div>
      </div>
      <div className="search__border-bottom"></div>
    </section>
  );
}

export default SearchForm;