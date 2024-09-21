<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verifica se o arquivo foi enviado
    if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = 'uploads/';
        $uploadFile = $uploadDir . basename($_FILES['photo']['name']);

        // Move o arquivo enviado para a pasta de uploads
        if (move_uploaded_file($_FILES['photo']['tmp_name'], $uploadFile)) {
            echo "Upload concluído com sucesso: " . $uploadFile;
        } else {
            echo "Erro ao mover o arquivo para o diretório de upload.";
        }
    } else {
        echo "Nenhum arquivo enviado ou erro no envio.";
    }
}
?>