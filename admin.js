// Função para adicionar filme
document.getElementById("addForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const year = document.getElementById("year").value;
    const rating = document.getElementById("rating").value;
    const cover = document.getElementById("cover").value;
    const description = document.getElementById("description").value;
    const url = document.getElementById("url").value;

    const newMovie = {
        nome: title,
        ano: year,
        avaliação: rating,
        capa: cover,
        sobre: description,
        url: url
    };

    // Carregar o JSON atual, adicionar o novo filme e exibir mensagem de sucesso
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            data.filmes[title] = newMovie;
            console.log('Filme adicionado:', newMovie);

            document.getElementById("success-message").innerText = "Filme adicionado com sucesso!";

            // Limpar o formulário
            document.getElementById("addForm").reset();
        })
        .catch(error => {
            console.error('Erro ao adicionar o filme:', error);
            document.getElementById("error-message").innerText = "Erro ao adicionar o filme!";
        });
});
