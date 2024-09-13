document.addEventListener('DOMContentLoaded', () => {
    const api = {
        users: 'users.json',
        movies: 'movies.json',
        series: 'series.json'
    };

    const movieList = document.getElementById('movie-list');
    const seriesList = document.getElementById('series-list');
    const movieListAdmin = document.getElementById('movie-list-admin');
    const seriesListAdmin = document.getElementById('series-list-admin');

    function fetchData(url) {
        return fetch(url).then(response => response.json());
    }

    function displayMovies(movies) {
        movieList.innerHTML = '';
        movieListAdmin.innerHTML = '';
        movies.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.innerHTML = `
                <h3>${movie.title}</h3>
                <p><strong>Gênero:</strong> ${movie.genre}</p>
                <p>${movie.description}</p>
            `;
            movieList.appendChild(movieDiv);
            movieListAdmin.appendChild(movieDiv.cloneNode(true));
        });
    }

    function displaySeries(series) {
        seriesList.innerHTML = '';
        seriesListAdmin.innerHTML = '';
        series.forEach(serie => {
            const seriesDiv = document.createElement('div');
            seriesDiv.innerHTML = `
                <h3>${serie.title}</h3>
                <p><strong>Gênero:</strong> ${serie.genre}</p>
                <p>${serie.description}</p>
                <p><strong>Temporadas:</strong> ${serie.seasons.join(', ')}</p>
            `;
            seriesList.appendChild(seriesDiv);
            seriesListAdmin.appendChild(seriesDiv.cloneNode(true));
        });
    }

    function loadData() {
        fetchData(api.movies).then(displayMovies);
        fetchData(api.series).then(displaySeries);
    }

    loadData();

    const loginForm = document.getElementById('login-form');
    const addMovieForm = document.getElementById('add-movie-form');
    const addSeriesForm = document.getElementById('add-series-form');
    const adminSection = document.getElementById('admin-section');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        fetchData(api.users).then(data => {
            const user = data.find(user => user.username === username && user.password === password);
            if (user) {
                adminSection.style.display = 'block';
            } else {
                alert('Usuário ou senha inválidos');
            }
        });
    });

    addMovieForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('movie-title').value;
        const genre = document.getElementById('movie-genre').value;
        const description = document.getElementById('movie-description').value;
        fetchData(api.movies).then(movies => {
            movies.push({ title, genre, description });
            // Aqui você precisaria atualizar o arquivo JSON com os dados novos.
            // Para fins de exemplo, vamos recarregar os dados.
            displayMovies(movies);
        });
    });

    addSeriesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('series-title').value;
        const genre = document.getElementById('series-genre').value;
        const description = document.getElementById('series-description').value;
        // Exemplo de temporadas
        const seasons = ['Temporada 1', 'Temporada 2'];
        fetchData(api.series).then(series => {
            series.push({ title, genre, description, seasons });
            // Aqui você precisaria atualizar o arquivo JSON com os dados novos.
            // Para fins de exemplo, vamos recarregar os dados.
            displaySeries(series);
        });
    });
});
