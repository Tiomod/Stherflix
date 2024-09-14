const apiKey = '6360eb433f3020d94a5de4f0fb52c720'; // Sua API key
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=pt-BR`;
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=`;

const moviesContainer = document.getElementById('movies');
const searchInput = document.getElementById('search');
const modal = document.getElementById('modal');
const trailerFrame = document.getElementById('trailer');
const closeModal = document.querySelector('.close');

// Função para buscar filmes na API
async function fetchMovies(url) {
    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results);
}

// Função para exibir os filmes
function displayMovies(movies) {
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        `;
        movieElement.addEventListener('click', () => fetchTrailer(movie.id));
        moviesContainer.appendChild(movieElement);
    });
}

// Função para buscar o trailer de um filme
async function fetchTrailer(movieId) {
    const trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=pt-BR`;
    const response = await fetch(trailerUrl);
    const data = await response.json();
    const trailer = data.results.find(video => video.type === 'Trailer');

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
        fetchMovies(searchUrl + searchTerm);
    } else {
        fetchMovies(apiUrl); // Se a busca estiver vazia, mostrar os filmes populares
    }
});

// Carregar filmes populares ao iniciar
fetchMovies(apiUrl);
