<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat GPT Simples</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
        }
        .chat-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            max-width: 600px;
            margin: auto;
            border: 1px solid #ddd;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .chat-box {
            flex: 1;
            padding: 10px;
            overflow-y: auto;
            border-bottom: 1px solid #ddd;
        }
        .chat-message {
            margin: 5px 0;
            padding: 10px;
            border-radius: 5px;
        }
        .user-message {
            background-color: #e1ffc7;
            text-align: right;
        }
        .gpt-message {
            background-color: #f0f0f0;
            text-align: left;
        }
        .input-container {
            display: flex;
        }
        .input-container input {
            flex: 1;
            padding: 10px;
            border: none;
            border-top: 1px solid #ddd;
            border-radius: 0 0 0 5px;
            outline: none;
        }
        .input-container button {
            padding: 10px;
            border: none;
            border-top: 1px solid #ddd;
            background-color: #007bff;
            color: #fff;
            border-radius: 0 0 5px 0;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="chat-container">
        <div class="chat-box" id="chat-box">
            <!-- Mensagens vão aparecer aqui -->
        </div>
        <div class="input-container">
            <input type="text" id="message-input" placeholder="Digite uma mensagem...">
            <button id="send-button">Enviar</button>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
