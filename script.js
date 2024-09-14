const apiKey = '6360eb433f3020d94a5de4f0fb52c720'; // Sua API key do TMDB

const apiUrlPopularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`;
const apiUrlTopRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-BR`;
const apiUrlUpcomingMovies = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=pt-BR`;

const apiUrlPopularSeries = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=pt-BR`;
const apiUrlTopRatedSeries = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=pt-BR`;
const apiUrlUpcomingSeries = `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=pt-BR`;

const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=pt-BR&query=`;

const moviesPopular = document.getElementById('movies-popular');
const moviesTopRated = document.getElementById('movies-top-rated');
const moviesUpcoming = document.getElementById('movies-upcoming');

const seriesPopular = document.getElementById('series-popular');
const seriesTopRated = document.getElementById('series-top-rated');
const seriesUpcoming = document.getElementById('series-upcoming');

const searchInput = document.getElementById('search');
const modal = document.getElementById('modal');
const trailerFrame = document.getElementById('trailer');
const closeModal = document.querySelector('.close');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalOverview = document.getElementById('modal-overview');

// Função para buscar filmes ou séries em cada categoria
async function fetchContent(url, container) {
    const response = await fetch(url);
    const data = await response.json();
    displayContent(data.results, container);
}

// Função para exibir filmes e séries em formato de carrossel
function displayContent(items, container) {
    container.innerHTML = '';
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add(item.media_type === 'movie' ? 'movie' : 'series');
        itemElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title || item.name}">
        `;
        itemElement.addEventListener('click', () => openModal(item.id, item.media_type, item.poster_path, item.title || item.name, item.overview));
        container.appendChild(itemElement);
    });
}

// Função para abrir o modal com detalhes e trailer
async function openModal(id, mediaType, posterPath, title, overview) {
    modalImage.src = `https://image.tmdb.org/t/p/w500${posterPath}`;
    modalTitle.textContent = title;
    modalOverview.textContent = overview;

    // Buscar o trailer usando a API TMDB
    const trailerUrl = await getTrailerUrl(id, mediaType);

    if (trailerUrl) {
        trailerFrame.src = trailerUrl;
    } else {
        trailerFrame.src = ''; // Não há trailer disponível
    }

    modal.style.display = 'block';
}

// Função para buscar o trailer usando a API TMDB
async function getTrailerUrl(id, mediaType) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${apiKey}&language=pt-BR`);
        const data = await response.json();
        const trailer = data.results.find(video => video.type === 'Trailer' && video.language === 'pt-BR');
        return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
    } catch (error) {
        console.error('Erro ao buscar trailer:', error);
        return null;
    }
}

// Fechar o modal
closeModal.onclick = function() {
    modal.style.display = 'none';
    trailerFrame.src = ''; // Parar o vídeo quando fechar o modal
}

// Fechar o modal clicando fora
   // Fechar o modal clicando fora
   window.onclick = function(event) {
       if (event.target === modal) {
           modal.style.display = 'none';
           trailerFrame.src = ''; // Parar o vídeo quando fechar o modal
       }
   }

   // Função para buscar conteúdo ao digitar no campo de pesquisa
   async function searchContent(query) {
       const response = await fetch(`${searchUrl}${encodeURIComponent(query)}`);
       const data = await response.json();
       displayContent(data.results, moviesPopular); // Exibe os resultados no container de filmes populares
   }

   // Adicionar eventos de carregamento e pesquisa
   window.onload = function() {
       fetchContent(apiUrlPopularMovies, moviesPopular);
       fetchContent(apiUrlTopRatedMovies, moviesTopRated);
       fetchContent(apiUrlUpcomingMovies, moviesUpcoming);

       fetchContent(apiUrlPopularSeries, seriesPopular);
       fetchContent(apiUrlTopRatedSeries, seriesTopRated);
       fetchContent(apiUrlUpcomingSeries, seriesUpcoming);
   };

   searchInput.addEventListener('input', function() {
       const query = searchInput.value;
       if (query.length > 2) {
           searchContent(query);
       } else {
           // Recarregar o conteúdo padrão se a consulta for muito curta
           fetchContent(apiUrlPopularMovies, moviesPopular);
       }
   });

