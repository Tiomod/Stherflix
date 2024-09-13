document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const item = decodeURIComponent(params.get('item'));

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const itemData = data[type][item];
            const links = data.link;

            if (!itemData) return;

            const categories = JSON.parse(itemData.categorias || '[]');
            const episodes = JSON.parse(itemData.episódios || '[]');

            const container = document.getElementById('details');
            const title = document.getElementById('title');
            title.textContent = itemData.nome;

            let html = `
                <div class="details-container">
                    <img src="${itemData.capa}" alt="${itemData.nome}">
                    <h2>${itemData.nome}</h2>
                    <p><strong>Ano:</strong> ${itemData.ano}</p>
                    <p><strong>Avaliação:</strong> ${itemData.avaliação}</p>
                    <p><strong>Sobre:</strong> ${itemData.sobre}</p>
                    <p><strong>Categorias:</strong> ${categories.map(cat => cat.name).join(', ')}</p>
            `;

            if (type === 'series') {
                html += `
                    <div class="episode-list">
                        <strong>Episódios:</strong>
                        <ul>
                            ${episodes.map(ep => {
                                const link = links[ep.p] ? links[ep.p].link : '#';
                                return `<li><a href="${link}" target="_blank">${ep.temporadasE} - ${ep.episódiosJ}</a></li>`;
                            }).join('')}
                        </ul>
                    </div>
                    <p><strong>Temporadas:</strong> ${JSON.parse(itemData.temporadas || '[]').map(t => t.temporadasJ).join(', ')}</p>
                `;
            } else {
                html += `
                    <a href="${links[`${itemData.nome}Dublado`].link}" target="_blank">Assistir Dublado</a>
                `;
            }

            if (itemData.videoLink) {
                html += `
                    <button id="play-button" class="play-button">Assistir</button>
                `;
            }

            html += '</div>';
            container.innerHTML = html;

            if (itemData.videoLink) {
                const playButton = document.getElementById('play-button');
                const player = document.getElementById('player');
                const playerFrame = document.getElementById('player-frame');
                const closeButton = document.getElementById('close-player');

                playButton.addEventListener('click', () => {
                    playerFrame.src = itemData.videoLink;
                    player.classList.add('player-visible');
                });

                closeButton.addEventListener('click', () => {
                    player.classList.remove('player-visible');
                    playerFrame.src = '';
                });
            }
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
});
