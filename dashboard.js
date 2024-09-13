function calcularDiasDiferenca(data1, data2) {
    const umDia = 24 * 60 * 60 * 1000;
    const diferencaMs = Math.abs(data2 - data1);
    return Math.round(diferencaMs / umDia);
}

// Função para carregar filmes e séries do JSON
function loadCatalogo() {
    fetch('dados.json')
        .then(response => response.json())
        .then(data => {
            const filmesContainer = document.getElementById("filmesContainer");
            const seriesContainer = document.getElementById("seriesContainer");
            const lancamentosContainer = document.getElementById("lancamentosContainer");

            const hoje = new Date();

            for (let item in data.filmes) {
                const info = data.filmes[item];
                const dataLancamento = new Date(info.ano);
                const diasDiferenca = calcularDiasDiferenca(hoje, dataLancamento);

                let filmeHTML = `
                    <div class="filme">
                        <img src="${info.capa}" alt="${info.nome}">
                        <h3>${info.nome}</h3>
                        <p>${info.sobre}</p>
                    </div>
                `;

                // Se o filme foi lançado nos últimos 30 dias, adiciona o selo de "Lançamento"
                if (diasDiferenca <= 30) {
                    filmeHTML = `
                        <div class="filme">
                            <img src="${info.capa}" alt="${info.nome}">
                            <h3>${info.nome}</h3>
                            <p>${info.sobre}</p>
                            <div class="lancamento">Lançamento</div>
                        </div>
                    `;
                    lancamentosContainer.innerHTML += filmeHTML;
                }

                // Separar por tipo: filme ou série
                if (info.tipo === "filme") {
                    filmesContainer.innerHTML += filmeHTML;
                } else if (info.tipo === "série") {
                    seriesContainer.innerHTML += filmeHTML;
                }
            }
        });
}

// Carregar o catálogo ao abrir o dashboard
loadCatalogo();
