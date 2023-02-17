import './Movies.css';
import React, { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

function Movies() {
    const [movies, setMovies] = useState(null)
    const [moviesAll, setMoviesAll] = useState([])
    const [saveMovies, setSaveMovies] = useState([])
    const [moviesInputSearch, setMoviesInputSearch] = useState('')
    const [moviesTumbler, setMoviesTumbler] = useState(false)
    const [moviesWithTumbler, setMoviesWithTumbler] = useState([])
    const [moviesShowed, setMoviesShowed] = useState([])
    const [moviesShowedWithTumbler, setMoviesShowedWithTumbler] = useState([])

    const [MoviesCount, setMoviesCount] = useState([])
    const [errorText, setErrorText] = useState('')
    const [preloader, setPreloader] = useState(false)

    useEffect(() => {
        setMoviesCount(getMoviesCount())
        const handlerResize = () => setMoviesCount(getMoviesCount())
        window.addEventListener('resize', handlerResize)

        return () => {
            window.removeEventListener('resize', handlerResize)
        };
    }, [])

    useEffect(() => {
        moviesApi.getMovies()
            .then(data => {
                localStorage.setItem('moviesAll', JSON.stringify(data))
                setMoviesAll(JSON.parse(localStorage.getItem('moviesAll')))
            })
            .catch((err) => {
                console.log('Ошибка при запросе ', err)
            });

        mainApi.getMovies()
            .then(data => {
                setSaveMovies(data)
            })
            .catch((err) => {
                console.log('Ошибка при запросе ', err)
            });

        const localStorageMovies = localStorage.getItem('movies')

        if (localStorageMovies) {
            const filterData = JSON.parse(localStorageMovies)
            setMoviesShowed(filterData.splice(0, getMoviesCount()[0]))
            setMovies(filterData)
            setPreloader(false)
        }

        const localStorageMoviesTumbler = localStorage.getItem('moviesTumbler')
        const localStorageMoviesInputSearch = localStorage.getItem('moviesInputSearch')

        if (localStorageMoviesTumbler) {
            setMoviesTumbler(localStorageMoviesTumbler === 'true')
        }

        if (localStorageMoviesInputSearch) {
            setMoviesInputSearch(localStorageMoviesInputSearch)
        }
    }, [])

    function getMoviesCount() {
        let countCards;
        const clientWidth = document.documentElement.clientWidth
        const MoviesCountConfig = {
            '1200': [12, 3],
            '900': [9, 3],
            '768': [8, 2],
            '240': [5, 2],
        }
        Object.keys(MoviesCountConfig)
            .sort((a, b) => a - b)
            .forEach((key) => {
                if (clientWidth > +key) {
                    countCards = MoviesCountConfig[key]
                }
            });

        return countCards
    }

    async function savedMoviesToggle(movies, favorite) {
        if (favorite) {
            const objMovies = {
                image: `https://api.nomoreparties.co${movies.image.url}`,
                trailerLink: movies.trailerLink,
                thumbnail: `https://api.nomoreparties.co${movies.image.url}`,
                movieId: movies.id,
                country: movies.country || 'Неизвестно',
                director: movies.director,
                duration: movies.duration,
                year: movies.year,
                description: movies.description,
                nameRU: movies.nameRU,
                nameEN: movies.nameEN,
            }
            try {
                await mainApi.addMovie(objMovies)
                const newSaved = await mainApi.getMovies()
                setSaveMovies(newSaved)
            } catch (err) {
                console.log('Ошибка', err)
            }
        } else {
            try {
                await mainApi.deleteMovie(movies._id)
                const newSaved = await mainApi.getMovies()
                setSaveMovies(newSaved)
            } catch (err) {
                console.log('Ошибка', err)
            }
        }
    }

    function handleGetMovies(inputSearch, tumbler) {
        if (!inputSearch) {
            setErrorText('Нужно ввести ключевое слово')
            return false
        }
        setErrorText('')

        if (tumbler) {
            let filterDataDuration = moviesAll.filter(({ duration }) => duration <= 40)
            const filterDataDurationFound = filterDataDuration.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()))

            localStorage.setItem('movies', JSON.stringify(filterDataDurationFound))
            localStorage.setItem('moviesInputSearch', inputSearch)

            const spliceDataDuration = filterDataDurationFound.splice(0, MoviesCount[0])

            setMoviesShowed(spliceDataDuration)
            setMovies(filterDataDurationFound)
            setMoviesShowedWithTumbler(spliceDataDuration)
            setMoviesWithTumbler(filterDataDurationFound)
        } else {
            let filterData = moviesAll.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()))

            localStorage.setItem('movies', JSON.stringify(filterData))
            localStorage.setItem('moviesInputSearch', inputSearch)

            const spliceData = filterData.splice(0, MoviesCount[0])

            setMoviesShowed(spliceData)
            setMovies(filterData)
            setMoviesShowedWithTumbler(spliceData)
            setMoviesWithTumbler(filterData)
        }
    }

    function handleGetMoviesTumbler(tumbler) {
        localStorage.setItem('moviesTumbler', tumbler)

        if (movies) {
            let filterDataShowed = []
            let filterData = []

            if (tumbler) {
                console.log('movies', movies)
                setMoviesShowedWithTumbler(moviesShowed)
                setMoviesWithTumbler(movies)
                filterDataShowed = moviesShowed.filter(({ duration }) => duration <= 40)
                filterData = movies.filter(({ duration }) => duration <= 40)
            } else {
                filterDataShowed = moviesShowedWithTumbler
                filterData = moviesWithTumbler
            }

            setMoviesShowed(filterDataShowed)
            setMovies(filterData)
        }
    }

    function handleMore() {
        const spliceMovies = movies
        const newMoviesShowed = moviesShowed.concat(spliceMovies.splice(0, MoviesCount[1]))
        setMoviesShowed(newMoviesShowed)
        setMovies(spliceMovies)
    }

    return (
        <div className="movies__main">
            <SearchForm
                handleGetMovies={handleGetMovies}
                handleGetMoviesTumbler={handleGetMoviesTumbler}
                moviesTumbler={moviesTumbler}
                moviesInputSearch={moviesInputSearch}
            />
            {preloader && <Preloader />}
            {errorText && <div className='movies__text-error'>{errorText}</div>}
            {!preloader && !errorText && movies !== null && saveMovies !== null && moviesShowed !== null && (
                <MoviesCardList
                    movies={moviesShowed}
                    saveMovies={saveMovies}
                    handleMore={handleMore}
                    savedMoviesToggle={savedMoviesToggle}
                    moviesMore={movies}
                />
            )}
        </div>
    );
}

export default Movies;