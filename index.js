// Função para exibir filmes
function displayMovies() {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            const moviesList = document.getElementById("moviesList");

            Object.keys(data.filmes).forEach(key => {
                const movie = data.filmes[key];

                // Criar elemento de lista para cada filme
                const li = document.createElement("li");
                li.innerHTML = `
                    <img src="${movie.capa}" alt="${movie.nome}" onclick="playVideo('${movie.url}')">
                    <strong>${movie.nome}</strong> (${movie.ano})<br>
                    Avaliação: ${movie.avaliação}<br>
                `;
                moviesList.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));
}

// Função para exibir o vídeo incorporado
function playVideo(url) {
    const videoPlayer = document.getElementById("videoPlayer");
    const videoContainer = document.getElementById("videoContainer");

    videoPlayer.src = url;  // Define o src do iframe com o URL do vídeo
    videoContainer.style.display = "flex";  // Exibe o container de vídeo
}

// Função para fechar o vídeo incorporado
document.getElementById("closeButton").addEventListener("click", function() {
    const videoContainer = document.getElementById("videoContainer");
    videoContainer.style.display = "none";  // Oculta o container de vídeo
    document.getElementById("videoPlayer").src = "";  // Para a reprodução do vídeo
});

// Carregar a lista de filmes ao abrir a página
if (document.getElementById("moviesList")) {
    displayMovies();
}
