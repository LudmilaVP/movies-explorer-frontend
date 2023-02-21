import { MOVIES_URL } from './constants.js'
class MoviesApi {
    constructor({ moviesUrl }) {
        this.moviesUrl = moviesUrl;;
        this.headers = {
            "Content-Type": "application/json",
        };
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getMovies() {
        return fetch(`${this.moviesUrl}`, {
            method: 'GET',
            headers: this._headers,
        }).then(this._getResponse);
    }
}

const moviesApi = new MoviesApi({
    url: MOVIES_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default moviesApi;