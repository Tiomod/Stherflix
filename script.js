const numeroGanhador = gerarNumeroAleatorio();
const localStorageKey = 'ultimaTentativa';

function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * 10) + 1;
}

function verificarTentativa() {
    const ultimaTentativa = localStorage.getItem(localStorageKey);
    if (ultimaTentativa) {
        const dataUltimaTentativa = new Date(ultimaTentativa);
        const agora = new Date();
        const diferencaEmMilisegundos = agora - dataUltimaTentativa;
    }
    return true; // Pode tentar
}

const form = document.getElementById('form-palpite');
const inputPalpite = document.getElementById('palpite');
const resultado = document.getElementById('resultado');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!verificarTentativa()) {
        resultado.textContent = "Você já tentou recentemente. Tente novamente mais tarde.";
        return;
    }

    const palpite = inputPalpite.value;

    if (palpite == numeroGanhador) {
        resultado.textContent = "Parabéns! Você acertou! Ganhou 50% de desconto!";
    } else {
        resultado.textContent = "Que pena, você errou.";
    }

    localStorage.setItem(localStorageKey, new Date());
});

// Gerar o número aleatório e armazenar no localStorage ao carregar a página
localStorage.setItem('numeroGanhador', numeroGanhador);
