import { BASE_URL } from './constants.js'
class MainApi {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this._headers = headers;
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserProfile() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers,
        })
            .then(this._getResponse)
    }

    checkToken() {
        return fetch(`${this.baseUrl}/users/me`, {
            credentials: 'include',
            headers: this._headers,
        })
            .then(this._getResponse)
    }

    setUserProfile({name, email}) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                email: email
            })
        })
            .then(this._getResponse);
    }

    getMovies() {
        return fetch(`${this.baseUrl}/movies`, {
            headers: this._headers,
            credentials: 'include',
        })
            .then(this._getResponse);
    }

    addMovie(movie) {
        return fetch(`${this.baseUrl}/movies`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                country: movie.country || 'Нет данных',
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: (`https://api.nomoreparties.co/${movie.image.url}`),
                trailerLink: movie.trailerLink || 'https://www.youtube.com',
                thumbnail: (`https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`),
                movieId: movie.id,
                nameRU: movie.nameRU || 'Нет данных',
                nameEN: movie.nameEN || 'Нет данных'})
            })
            .then(this._getResponse);
    }

    deleteMovie(movieId) {
        return fetch(`${this.baseUrl}/movies/${movieId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers,
        })
            .then(this._getResponse);
    }
}

const mainApi = new MainApi({
    baseUrl: BASE_URL,
    headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
    },
})

export default mainApi