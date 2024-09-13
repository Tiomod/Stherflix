document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('content');

            function formatCategories(categories) {
                return categories.map(cat => cat.name).join(', ');
            }

            function formatEpisodes(episodes, links) {
                return episodes.map(ep => {
                    const link = links[ep.p] ? links[ep.p].link : '#';
                    return `<li><a href="${link}" target="_blank">${ep.temporadasE} - ${ep.episódiosJ}</a></li>`;
                }).join('');
            }

            function isRecentRelease(dateStr) {
                const releaseDate = new Date(dateStr);
                const today = new Date();
                const diffTime = Math.abs(today - releaseDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= 30;
            }

            function generateItemHtml(item, type) {
                const itemData = data[type][item];
                if (!itemData) return '';

                const categories = JSON.parse(itemData.categorias || '[]');
                const episodes = JSON.parse(itemData.episódios || '[]');
                const links = data.link;

                let html = `
                    <div class="item">
                        <a href="details.html?type=${type}&item=${encodeURIComponent(item)}">
                            <img src="${itemData.capa}" alt="${itemData.nome}">
                        </a>
                        <div>
                            <h2>${itemData.nome}</h2>
                            <p><strong>Ano:</strong> ${itemData.ano}</p>
                            <p><strong>Avaliação:</strong> ${itemData.avaliação}</p>
                            <p><strong>Sobre:</strong> ${itemData.sobre}</p>
                            <p><strong>Categorias:</strong> ${formatCategories(JSON.parse(itemData.categorias || '[]'))}</p>
                `;
                
                if (type === 'series') {
                    html += `
                        <div class="episode-list">
                            <strong>Episódios:</strong>
                            <ul>
                                ${formatEpisodes(episodes, links)}
                            </ul>
                        </div>
                        <p><strong>Temporadas:</strong> ${JSON.parse(itemData.temporadas || '[]').map(t => t.temporadasJ).join(', ')}</p>
                    `;
                } else {
                    html += `<a href="${links[`${itemData.nome}Dublado`].link}" target="_blank">Assistir Dublado</a>`;
                }

                if (isRecentRelease(itemData.ano)) {
                    html += '<span class="launch">Lançamento Recent</span>';
                }

                html += '</div></div>';
                return html;
            }

            const filmes = Object.keys(data.filmes || {});
            const series = Object.keys(data.series || {});

            container.innerHTML = filmes.map(filme => generateItemHtml(filme, 'filmes')).join('') +
                                   series.map(serie => generateItemHtml(serie, 'series')).join('');
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
});
