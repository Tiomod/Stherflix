// Simulação de banco de dados JSON (carregado do db.json)
function loadMovies() {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            const moviesList = document.getElementById("moviesList");

            Object.keys(data.filmes).forEach(key => {
                const movie = data.filmes[key];

                // Criar elemento de lista para cada filme/série
                const li = document.createElement("li");
                li.innerHTML = `
                    <img src="${movie.capa}" alt="${movie.nome}">
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

// Função para login
document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Usuário fictício
    if (username === "admin" && password === "1234") {
        window.location.href = "admin.html";
    } else {
        document.getElementById("error-message").innerText = "Usuário ou senha incorretos!";
    }
});

// Função para adicionar filme/série no admin
document.getElementById("addForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const type = document.getElementById("type").value;
    const year = document.getElementById("year").value;
    const rating = document.getElementById("rating").value;
    const cover = document.getElementById("cover").value;
    const description = document.getElementById("description").value;

    const newMovie = {
        nome: title,
        ano: year,
        avaliação: rating,
        capa: cover,
        categorias: [],
        sobre: description,
        tipo: type
    };

    // Carregar o JSON atual, adicionar o novo filme/série e exibir mensagem de sucesso
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            data.filmes[title] = newMovie;
            console.log('Filme/Série adicionada:', newMovie);

            document.getElementById("success-message").innerText = "Filme/Série adicionada com sucesso!";

            // Limpar o formulário
            document.getElementById("addForm").reset();
        })
        .catch(error => console.error('Erro ao adicionar o filme:', error));
});

// Carregar a lista de filmes ao abrir a página movies.html
if (document.getElementById("moviesList")) {
    loadMovies();
}
