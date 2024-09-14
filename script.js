document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('content');

            let html = '<h2>Filmes</h2>';
            html += '<div class="item-container">';

            Object.keys(data.filmes).forEach(key => {
                const item = data.filmes[key];
                html += `
                    <div class="item">
                        <a href="details.html?type=filmes&item=${encodeURIComponent(key)}">
                            <img src="${item.capa}" alt="${item.nome}">
                            <h3>${item.nome}</h3>
                        </a>
                    </div>
                `;
            });

            html += '</div><h2>Séries</h2>';
            html += '<div class="item-container">';

            Object.keys(data.séries).forEach(key => {
                const item = data.séries[key];
                html += `
                    <div class="item">
                        <a href="details.html?type=séries&item=${encodeURIComponent(key)}">
                            <img src="${item.capa}" alt="${item.nome}">
                            <h3>${item.nome}</h3>
                        </a>
                    </div>
                `;
            });

            html += '</div>';
            container.innerHTML = html;
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
});
