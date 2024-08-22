document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    // Função para adicionar uma mensagem ao chat
    function addMessage(text, isUserMessage) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUserMessage ? 'user-message' : 'gpt-message'}`;
        messageDiv.textContent = text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Rolagem automática para a mensagem mais recente
    }

    // Envia a mensagem e obtém a resposta do "servidor"
    async function sendMessage() {
        const userMessage = messageInput.value.trim();
        if (userMessage === '') return;

        addMessage(userMessage, true); // Adiciona a mensagem do usuário
        messageInput.value = '';

        // Simula a resposta do servidor
        try {
            const response = await fetch('https://your-server-url/gpt', { // Substitua pela URL do seu backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userMessage })
            });
            const data = await response.json();
            const gptMessage = data.response || 'Desculpe, não consegui entender.';
            addMessage(gptMessage, false); // Adiciona a resposta do GPT
        } catch (error) {
            console.error('Erro ao enviar a mensagem:', error);
            addMessage('Desculpe, ocorreu um erro ao enviar a mensagem.', false);
        }
    }

    // Envia a mensagem quando o botão é clicado
    sendButton.addEventListener('click', sendMessage);

    // Envia a mensagem quando a tecla Enter é pressionada
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
