// Função para carregar o JSON externo
function loadMovies() {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            const moviesList = document.getElementById("moviesList");

            // Iterar sobre cada filme/série no JSON
            Object.keys(data.filmes).forEach(key => {
                const movie = data.filmes[key];
                
                // Criar elemento de lista para cada filme/série
                const li = document.createElement("li");
                li.innerHTML = `
                    <img src="${movie.capa}" alt="${movie.nome}" style="width: 100px;">
                    <strong>${movie.nome}</strong> (${movie.ano})<br>
                    Avaliação: ${movie.avaliação}<br>
                    Categorias: ${movie.categorias.map(c => c.name).join(", ")}<br>
                    <p>${movie.sobre}</p>
                    <button onclick="watch('${movie.nome}')">Assistir</button>
                `;
                moviesList.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));
}

function watch(title) {
    alert(`Assistindo ${title}`);
}

// Carregar lista de filmes ao abrir a página
if (document.getElementById("moviesList")) {
    loadMovies();
}
