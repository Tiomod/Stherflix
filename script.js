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

            // Função para gerar HTML para filmes e séries
            function generateItemHtml(item, type) {
                const itemData = data[item];
                if (!itemData || itemData.tipo !== type) return '';

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
                
                if (type === 'séries') {
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

                html += '</div></div>';
                return html;
            }

            // Adiciona filmes e séries ao HTML
            const items = Object.keys(data);
            const filmes = items.filter(item => data[item].tipo === 'filmes');
            const series = items.filter(item => data[item].tipo === 'séries');

            container.innerHTML = filmes.map(filme => generateItemHtml(filme, 'filmes')).join('') +
                                   series.map(serie => generateItemHtml(serie, 'séries')).join('');
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
});
