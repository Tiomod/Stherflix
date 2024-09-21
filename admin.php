<?php
// Defina o IP permitido
$allowed_ip = 'SEU.IP.AQUI'; // Substitua pelo seu IP

// Verifique o IP do visitante
if ($_SERVER['REMOTE_ADDR'] !== $allowed_ip) {
    die('Acesso negado.');
}

// Listar os arquivos de imagem no diretório 'uploads'
$files = glob('uploads/*.jpg');
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Painel Administrativo - Visualizar Fotos</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
    h1 { text-align: center; }
    .gallery { display: flex; flex-wrap: wrap; justify-content: center; }
    .photo { margin: 10px; }
    .photo img { width: 320px; height: auto; }
  </style>
</head>
<body>
  <h1>Fotos Capturadas</h1>
  <div class="gallery">
    <?php if (!empty($files)): ?>
      <?php foreach ($files as $file): ?>
        <div class="photo">
          <img src="<?php echo $file; ?>" alt="Foto Capturada">
        </div>
      <?php endforeach; ?>
    <?php else: ?>
      <p>Nenhuma foto disponível.</p>
    <?php endif; ?>
  </div>
</body>
</html>