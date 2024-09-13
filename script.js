document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('content');

            // Função para formatar categorias
            function formatCategories(categories) {
                return categories.map(cat => cat.name).join(', ');
            }

            // Função para formatar episódios
            function formatEpisodes(episodes, links) {
                return episodes.map(ep => {
                    const link = links[ep.p] ? links[ep.p].link : '#';
                    return `<li><a href="${link}">${ep.temporadasE} - ${ep.episódiosJ}</a></li>`;
                }).join('');
            }

            // Função para verificar se o item foi lançado nos últimos 30 dias
            function isRecentRelease(dateStr) {
                const releaseDate = new Date(dateStr);
                const today = new Date();
                const diffTime = Math.abs(today - releaseDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= 30;
            }

            // Função para gerar HTML para filmes e séries
            function generateItemHtml(item, type) {
                const itemData = data[type][item];
                if (!itemData) return '';

                const categories = JSON.parse(itemData.categorias || '[]');
                const episodes = JSON.parse(itemData.episódios || '[]');
                const links = data.link;

                let html = `
                    <div class="item">
                        <img src="${itemData.capa}" alt="${itemData.nome}">
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
                    html += `<a href="${links[`${itemData.nome}Dublado`].link}">Assistir Dublado</a>`;
                }

                if (isRecentRelease(itemData.ano)) {
                    html += '<span class="launch">Lançamento Recent</span>';
                }

                html += '</div></div>';
                return html;
            }

            // Adiciona filmes e séries ao HTML
            const filmes = Object.keys(data.filmes || {});
            const series = Object.keys(data.series || {});

            container.innerHTML = filmes.map(filme => generateItemHtml(filme, 'filmes')).join('') +
                                   series.map(serie => generateItemHtml(serie, 'series')).join('');
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
});
