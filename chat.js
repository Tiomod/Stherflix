const chat = document.getElementById('chat');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');

// Função para enviar uma mensagem
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        chat.appendChild(messageElement);
        messageInput.value = '';
        chat.scrollTop = chat.scrollHeight; // Rolagem automática para a última mensagem
    }
}

// Adiciona um evento ao botão de enviar
sendButton.addEventListener('click', sendMessage);

// Adiciona um evento para enviar mensagem com Enter
messageInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});
