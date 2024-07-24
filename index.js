<!DOCTYPE html>
<html>
<head>
<title>StherFlix - Filmes e Séries Ilimitados</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap'); 

body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  background: linear-gradient(45deg, #000, #222); 
  color: #fff;
  text-align: center;
}

h1, h2, p {
  text-shadow: 0 0 10px #e50914;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.hero {
  background: url('https://i.ibb.co/7nYRVG8/wp11610961-chica-vampiro-wallpapers.png') center/cover no-repeat; 
  padding: 100px 0; 
  text-align: center;
}

.hero h1 {
  font-size: 4em;
  margin-bottom: 20px;
}

.download-btn {
  display: inline-block;
  padding: 15px 30px;
  background: #e50914;
  color: #fff;
  font-weight: 500;
  text-decoration: none;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease; 
}

.download-btn:hover {
  background: #d30812; 
}

.featured-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  padding: 40px 0;
}

.featured-item {
  border-radius: 10px; 
  overflow: hidden;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3); 
  transition: transform 0.3s ease; 
  position: relative; /* Para posicionar a data de lançamento */
}

.featured-item:hover {
  transform: scale(1.05); 
}

.featured-item img {
  width: 100%;
  height: 350px;
  object-fit: cover;
}

.music-buttons {
  position: absolute;
  top: 20px;
  left: 20px;
}

.music-button {
  display: block;
  margin-bottom: 10px;
  padding: 8px 15px;
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.featured-item .release-date {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px 10px;
  background-color: #e50914; /* Cor vermelha da Netflix */
  color: white;
  font-weight: bold;
  border-radius: 5px;
}

/* Estilos para o popup do trailer */
.trailer-popup {
  display: none; 
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #000;
  padding: 20px;
  border-radius: 10px;
  z-index: 10; 
}

.trailer-popup iframe {
  width: 800px;
  height: 450px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}

/* Styles for the movie info popup */
.movie-info-popup {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #000;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  z-index: 10;
  max-width: 400px;
}

.movie-info-popup h3 {
  margin-top: 0;
}

.movie-info-popup img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}
</style>
</head>
<body>
  <div class="music-buttons">
    <button class="music-button" data-src="https://www.bensound.com/bensound-music/bensound-ukulele.mp3">Música 1</button>
    <button class="music-button" data-src="https://www.bensound.com/bensound-music/bensound-creativeminds.mp3">Música 2</button>
    <button class="music-button" data-src="https://www.bensound.com/bensound-music/bensound-happyrock.mp3">Música 3</button>
  </div>

  <audio id="audioPlayer" loop volume="0.5"></audio>

<div class="container">
    <div class="hero">
      <h1>StherFlix</h1>
      <h2>Filmes e séries ilimitados, grátis!</h2>
      <button onclick="downloadFile()">Baixar Agora</button>
    </div>
</div>

    <h2>Em Destaque</h2>
    <div class="featured-section" id="movie-grid"></div>
  </div>

  <div class="trailer-popup" id="trailerPopup">
    <iframe id="trailerIframe" src="" frameborder="0" allowfullscreen></iframe>
    <button class="close-btn" onclick="closeTrailerPopup()">X</button>
  </div>

  <div class="movie-info-popup" id="movieInfoPopup">
    <img id="movieInfoPoster" src="" alt="Movie Poster">
    <h3 id="movieInfoTitle"></h3>
    <p id="movieInfoOverview"></p>
    <button class="close-btn" onclick="closeMovieInfoPopup()">X</button>
  </div>
  <script>
  const audioPlayer = document.getElementById('audioPlayer');
  const musicButtons = document.querySelectorAll('.music-button');

  musicButtons.forEach(button => {
    button.addEventListener('click', () => {
      audioPlayer.src = button.dataset.src;
      audioPlayer.play();
    });
  });

  const apiKey = '6360eb433f3020d94a5de4f0fb52c720'; 
  const apiUrl = https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1;
  const movieGrid = document.getElementById('movie-grid');

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      data.results.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('featured-item');

        const img = document.createElement('img');
        img.src = https://image.tmdb.org/t/p/w500${movie.poster_path};
        img.alt = movie.title;
        movieItem.appendChild(img);

        // Adicionar data de lançamento ou "Em Breve"
        const releaseDateElement = document.createElement('div');

        releaseDateElement.classList.add('release-date');

        const releaseDate = movie.release_date;
        if (releaseDate) {
          releaseDateElement.textContent = Lançamento: ${releaseDate};
        } else {
          releaseDateElement.textContent = 'Em Breve';
        }

        movieItem.appendChild(releaseDateElement);

        // Long-press/click-and-hold event
        let timeoutId;
        movieItem.addEventListener('mousedown', () => {
          timeoutId = setTimeout(() => {
            showMovieInfo(movie);
          }, 500); 
        });

        movieItem.addEventListener('mouseup', () => {
          clearTimeout(timeoutId);
        });

        // Click event for trailer
        movieItem.addEventListener('click', () => {
          fetch(https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=pt-BR)
            .then(response => response.json())
            .then(videos => {
              const trailerKey = videos.results.find(video => video.type === 'Trailer')?.key;
              if (trailerKey) {
                document.getElementById('trailerIframe').src = https://www.youtube.com/embed/${trailerKey};
                document.getElementById('trailerPopup').style.display = 'block';
              } else {
                alert("Desculpe, trailer não encontrado para este filme.");
              }
            });
        }); 

        movieGrid.appendChild(movieItem);
      });
    })
    .catch(error => {
      console.error('Erro ao buscar dados da API:', error);
      // Handle errors, e.g., show an error message to the user
    });

  function closeTrailerPopup() {
    document.getElementById('trailerIframe').src = '';
    document.getElementById('trailerPopup').style.display = 'none';
  }

  function closeMovieInfoPopup() {
    document.getElementById('movieInfoPopup').style.display = 'none';
  }

  function showMovieInfo(movie) {
    document.getElementById('movieInfoPoster').src = https://image.tmdb.org/t/p/w500${movie.poster_path};
    document.getElementById('movieInfoTitle').textContent = movie.title;
    document.getElementById('movieInfoOverview').textContent = movie.overview;
    document.getElementById('movieInfoPopup').style.display = 'block';
  }
  
       function downloadFile() {
          window.location.href = "download.php";
        }
</script>

</body>
</html>