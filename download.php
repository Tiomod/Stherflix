<?php
// Substitua 'meu_arquivo.apk' pelo caminho completo do seu arquivo APK
$file = 'Stherflix_1.0.apk';

// Define o tipo de conteúdo para o navegador
header('Content-Description: File Transfer');
header('Content-Type: application/vnd.android.package-archive');
header('Content-Disposition: attachment; filename="'.basename($file).'"');
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
header('Content-Length: ' . filesize($file));

// **Corrija a linha abaixo:**
header('Content-Length: ' . filesize($file));

readfile($file);
exit;