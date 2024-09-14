const apiKey = '6360eb433f3020d94a5de4f0fb52c720'; // Sua API key
const apiUrlPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`;
const apiUrlTopRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-BR`;
const apiUrlUpcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=pt-BR`;
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=`;

const moviesPopular = document.getElementById('movies-popular');
const moviesTopRated = document.getElementById('movies-top-rated');
const moviesUpcoming = document.getElementById('movies-upcoming');
const searchInput = document.getElementById('search');
const modal = document.getElementById('modal');
const trailerFrame = document.getElementById('trailer');
const closeModal = document.querySelector('.close');

// Função para buscar filmes em cada categoria
async function fetchMovies(url, container) {
    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results, container);
}

// Função para exibir os filmes em formato de carrossel
function displayMovies(movies, container) {
    container.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        `;
        movieElement.addEventListener('click', () => fetchTrailer(movie.id));
        container.appendChild(movieElement);
    });
}

// Função para buscar o trailer de um filme, primeiro em português, depois em outro idioma
async function fetchTrailer(movieId) {
    let trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=pt-BR`;
    let response = await fetch(trailerUrl);
    let data = await response.json();
    let trailer = data.results.find(video => video.type === 'Trailer');

    // Se não encontrar trailer em português, busca trailer sem restrição de idioma
    if (!trailer) {
        trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;
        response = await fetch(trailerUrl);
        data = await response.json();
        trailer = data.results.find(video => video.type === 'Trailer');
    }

    // Se encontrar algum trailer, exibe-o no modal
    if (trailer) {
        trailerFrame.src = `https://www.youtube.com/embed/${trailer.key}`;
        modal.style.display = 'block';
    } else {
        alert('Trailer não disponível.');
    }
}

// Fechar o modal
closeModal.onclick = function() {
    modal.style.display = 'none';
    trailerFrame.src = ''; // Parar o vídeo quando fechar o modal
}

// Fechar o modal clicando fora
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        trailerFrame.src = ''; // Parar o vídeo quando fechar o modal
    }
}

// Buscar filmes ao digitar
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        fetchMovies(searchUrl + searchTerm, document.querySelector('#movies-popular')); // Mostrar resultados da pesquisa
    } else {
        fetchMovies(apiUrlPopular, moviesPopular);
        fetchMovies(apiUrlTopRated, moviesTopRated);
        fetchMovies(apiUrlUpcoming, moviesUpcoming); // Recarregar filmes populares, mais bem avaliados e lançamentos
    }
});

// Carregar os filmes de cada categoria ao iniciar
fetchMovies(apiUrlPopular, moviesPopular);
fetchMovies(apiUrlTopRated, moviesTopRated);
fetchMovies(apiUrlUpcoming, moviesUpcoming);
