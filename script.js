// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBI8miT9mb1JOoVzxyb-4MFeBKiXygZnGE",
    authDomain: "sther-ae214.firebaseapp.com",
    databaseURL: "https://sther-ae214-default-rtdb.firebaseio.com",
    projectId: "sther-ae214",
    storageBucket: "sther-ae214.appspot.com",
    appId: "1:319748838574:web:74c29a6c83ffbfd017093f"
};

// Inicializar Firebase
let firebaseInitialized = false;

try {
    firebase.initializeApp(firebaseConfig);
    firebaseInitialized = true;
    document.getElementById('firebaseStatus').textContent = 'Firebase conectado com sucesso!';
    document.getElementById('loginContainer').style.display = 'block'; // Mostrar o formulário de login
} catch (error) {
    document.getElementById('firebaseStatus').textContent = 'Erro ao conectar com o Firebase. Tente novamente mais tarde.';
    console.error('Erro ao conectar com o Firebase:', error);
}

// Função para autenticar o usuário
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário
    if (!firebaseInitialized) {
        document.getElementById('message').textContent = 'Erro de autenticação: Firebase não está conectado.';
        document.getElementById('message').style.color = 'red';
        return;
    }

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const saveLogin = document.getElementById('saveLogin').checked;
    const message = document.getElementById('message');

    // Resetar mensagem de erro/sucesso
    message.textContent = "";

    // Verificar se o usuário existe no Firebase Realtime Database
    const dbRef = firebase.database().ref('usuarios/' + username);

    dbRef.once('value').then((snapshot) => {
        const userData = snapshot.val();

        if (userData && userData.senha === password) {
            // Login bem-sucedido
            message.style.color = 'green';
            message.textContent = 'Login realizado com sucesso!';

            // Salvar login no localStorage se checkbox marcado
            if (saveLogin) {
                localStorage.setItem('username', username);
            } else {
                localStorage.removeItem('username');
            }

            // Redirecionar ou carregar a próxima página, se necessário
            // window.location.href = 'proxima_pagina.html';
        } else {
            // Usuário ou senha incorretos
            message.style.color = 'red';
            message.textContent = 'Usuário ou senha incorretos!';
        }
    }).catch((error) => {
        // Erro ao conectar com Firebase
        console.error('Erro ao autenticar:', error);
        message.style.color = 'red';
        message.textContent = 'Erro ao conectar com o Firebase. Tente novamente mais tarde.';
    });
});

// Carregar login salvo do localStorage
window.onload = function() {
    const savedUsername = localStorage.getItem('username');
    
    if (savedUsername) {
        document.getElementById('username').value = savedUsername;
        document.getElementById('saveLogin').checked = true;
    }
};
