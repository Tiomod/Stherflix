const urlParams = new URLSearchParams(window.location.search);
const role = urlParams.get("role");
const username = urlParams.get("username");

document.getElementById("roleMessage").textContent = role === "admin" ? 
    `Bem-vindo, ${username}. Você tem privilégios de administrador.` : 
    `Bem-vindo, ${username}.`;

// Função para carregar filmes do JSON
function loadFilmes() {
    fetch('dados.json')
        .then(response => response.json())
        .then(data => {
            const filmesContainer = document.getElementById("filmesContainer");
            let filmesHTML = '';

            for (let filme in data.filmes) {
                const info = data.filmes[filme];
                filmesHTML += `
                    <div class="filme">
                        <img src="${info.capa}" alt="${info.nome}">
                        <h3>${info.nome}</h3>
                        <p>${info.sobre}</p>
                        <p><strong>Avaliação:</strong> ${info.avaliação}</p>
                    </div>
                `;
            }

            filmesContainer.innerHTML = filmesHTML;

            // Se o usuário for admin, exibir botão de edição
            if (role === "admin") {
                const adminButtons = document.createElement("div");
                adminButtons.innerHTML = `<button onclick="editarFilme()">Editar Filmes</button>`;
                filmesContainer.appendChild(adminButtons);
            }
        });
}

function editarFilme() {
    alert('Modo de edição ativado! (Simulação)');
}

loadFilmes();
