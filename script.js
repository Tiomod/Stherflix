// Simulação de banco de dados de usuários (JSON)
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [
    { usuario: "admin", senha: "12345", validade: null }
];

// Login via JSON
document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const usuarioInput = document.getElementById("usuario").value;
    const senhaInput = document.getElementById("senha").value;
    
    const usuarioValido = usuarios.find(u => u.usuario === usuarioInput && u.senha === senhaInput);
    
    if (usuarioValido) {
        // Checar validade (se o usuário não for admin)
        if (usuarioValido.usuario !== "admin") {
            const dataExpiracao = new Date(usuarioValido.validade);
            const dataAtual = new Date();
            
            if (dataAtual > dataExpiracao) {
                alert("Sua conta expirou.");
                return;
            }
        }

        // Salvar status de login no localStorage
        localStorage.setItem("usuarioLogado", usuarioValido.usuario);
        window.location.href = "index.html";  // Redirecionar para o painel
    } else {
        document.getElementById("mensagemErro").textContent = "Usuário ou senha incorretos.";
    }
});

// Verificar se o usuário está logado
if (window.location.pathname.includes("index.html")) {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    
    if (!usuarioLogado) {
        window.location.href = "login.html";  // Redirecionar para o login se não estiver logado
    } else {
        // Mostrar o painel de administração se o usuário for admin
        if (usuarioLogado === "admin") {
            document.getElementById("adminPanel").style.display = "block";
            document.getElementById("userPanel").style.display = "block";
        }

        // Carregar vídeos do localStorage
        carregarVideos();
    }
}

// Função para adicionar um vídeo (com embed)
document.getElementById("videoForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const embedCode = document.getElementById("embedCode").value;

    const videos = JSON.parse(localStorage.getItem("videos")) || [];

    const novoVideo = {
        embedCode: embedCode
    };

    videos.push(novoVideo);
    localStorage.setItem("videos", JSON.stringify(videos));
    
    carregarVideos();
    
    // Limpar os campos do formulário
    document.getElementById("embedCode").value = "";
});

// Função para carregar vídeos
function carregarVideos() {
    const videoContainer = document.getElementById("videoContainer");
    videoContainer.innerHTML = "";  // Limpar antes de adicionar os vídeos

    const videos = JSON.parse(localStorage.getItem("videos")) || [];

    videos.forEach((video, index) => {
        const videoDiv = document.createElement("div");
        videoDiv.classList.add("video-embed");

        videoDiv.innerHTML = video.embedCode;

        videoContainer.appendChild(videoDiv);
    });
}

// Função para criar novos usuários
document.getElementById("userForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const novoUsuario = document.getElementById("novoUsuario").value;
    const novaSenha = document.getElementById("novaSenha").value;
    const validadeMeses = parseInt(document.getElementById("validade").value);

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Definir a data de expiração com base nos meses
    const dataExpiracao = new Date();
    dataExpiracao.setMonth(dataExpiracao.getMonth() + validadeMeses);

    const novoUsuarioObj = {
        usuario: novoUsuario,
        senha: novaSenha,
        validade: dataExpiracao.toISOString()  // Armazenar a data de expiração no formato ISO
    };

    usuarios.push(novoUsuarioObj);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Mostrar mensagem de sucesso
    document.getElementById("mensagemSucesso").textContent = "Usuário criado com sucesso!";
    
    // Limpar os campos do formulário
    document.getElementById("novoUsuario").value = "";
    document.getElementById("novaSenha").value = "";
    document.getElementById("validade").value = "";
});