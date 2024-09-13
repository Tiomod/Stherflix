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
                    <img src="${movie.capa}" alt="${movie.nome}">
                    <strong>${movie.nome}</strong> (${movie.ano})<br>
                    Avaliação: ${movie.avaliação}<br>
                    <p>${movie.sobre}</p>
                `;
                moviesList.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));
}

// Carregar a lista de filmes ao abrir a página
if (document.getElementById("moviesList")) {
    displayMovies();
}
