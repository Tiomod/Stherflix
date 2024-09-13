document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch('dados.json')
        .then(response => response.json())
        .then(data => {
            const user = data.usuarios.find(u => u.username === username && u.password === password);

            if (user) {
                window.location.href = `dashboard.html?username=${user.username}`;
            } else {
                document.getElementById("errorMessage").textContent = "Usuário ou senha inválidos.";
            }
        });
});
