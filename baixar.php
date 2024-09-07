<?php
    $file = 'downloads/stherflix.apk'; // Caminho para o arquivo APK

    if (file_exists($file)) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . basename($file) . '"');
        header('Content-Length: ' . filesize($file));
        flush();
        readfile($file);
        exit;
    } else {
        echo "Arquivo não encontrado.";
    }
?>
