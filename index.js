<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StherFlix - Seu App de Filmes e Séries</title>
    <style>
        body {
            background-color: #000000;
            color: #e50914; /* Vermelho Netflix */
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }

        .container {
            max-width: 800px;
            text-align: center;
            background-color: #1c1c1c; /* Fundo cinza escuro */
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(229, 9, 20, 0.5);
        }

        .header {
            font-size: 3em;
            margin-bottom: 20px;
            color: #e50914; /* Vermelho Netflix */
        }

        .description {
            font-size: 1.2em;
            margin-bottom: 30px;
            color: #ffffff;
        }

        .pricing {
            font-size: 1.5em;
            margin-bottom: 30px;
            color: #ffffff;
        }

        .plan {
            margin-bottom: 15px;
        }

        .movie-info {
            margin-top: 30px;
            color: #ffffff;
        }

        .movie-title {
            font-size: 1.5em;
            margin-bottom: 10px;
        }

        .movie-description {
            font-size: 1em;
            margin-bottom: 20px;
        }

        .movie-poster {
            max-width: 200px; /* Define a largura máxima da imagem para 200px */
            max-height: 300px; /* Define a altura máxima da imagem para 300px */
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(229, 9, 20, 0.5);
            margin-bottom: 20px;
        }

        .footer {
            font-size: 0.8em;
            margin-top: 40px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">StherFlix</div>
        <div class="description">
            Bem-vindo ao StherFlix, o aplicativo definitivo para assistir a filmes e séries! Desfrute de uma vasta biblioteca de conteúdo com atualizações constantes e qualidade inigualável. Escolha o plano que melhor se adapta a você e comece a sua jornada cinematográfica agora!
        </div>

        <div class="pricing">
            <div class="plan">Plano Mensal: R$ 15,00/mês</div>
            <div class="plan">Plano Anual: R$ 40,00/ano</div>
        </div>

        <div class="movie-info">
            <div class="movie-title" id="movie-title">Carregando...</div>
            <img id="movie-poster" class="movie-poster" src="" alt="Poster do Filme">
            <div class="movie-description" id="movie-description"></div>
        </div>

        <div class="footer">
            &copy; 2024 StherFlix. Todos os direitos reservados.
        </div>
    </div>

    <script>
        const apiKey = '6360eb433f3020d94a5de4f0fb52c720'; // Substitua por sua chave de API TMDb
        const movieTitle = document.getElementById('movie-title');
        const movieDescription = document.getElementById('movie-description');
        const moviePoster = document.getElementById('movie-poster');

        async function fetchRandomMovie() {
            try {
                // Busca de um filme aleatório
                const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=${Math.floor(Math.random() * 10) + 1}`);
                const data = await response.json();

                // Seleciona um filme aleatório da lista
                const randomIndex = Math.floor(Math.random() * data.results.length);
                const movie = data.results[randomIndex];

                // Exibe as informações do filme
                movieTitle.textContent = movie.title;
                movieDescription.textContent = movie.overview;
                moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            } catch (error) {
                console.error('Erro ao buscar o filme:', error);
                movieTitle.textContent = 'Erro ao carregar o filme';
                movieDescription.textContent = '';
                moviePoster.src = '';
            }
        }

        // Carrega um filme ao carregar a página
        fetchRandomMovie();

        // Atualiza o filme a cada 10 segundos
        setInterval(fetchRandomMovie, 10000);
    </script>
</body>
</html>
            
