<?php
$allowed_ip = 'SEU.IP.AQUI';

// Verifique o IP do visitante
if ($_SERVER['REMOTE_ADDR'] !== $allowed_ip) {
    die('Acesso negado.');
}

$files = glob('uploads/*.jpg');

?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Painel Administrativo - Visualizar Fotos</title>
</head>
<body>
  <h1>Fotos Capturadas</h1>
  <?php if (!empty($files)): ?>
    <?php foreach ($files as $file): ?>
      <div>
        <img src="<?php echo $file; ?>" alt="Foto Capturada" width="320" height="240">
      </div>
    <?php endforeach; ?>
  <?php else: ?>
    <p>Nenhuma foto disponível.</p>
  <?php endif; ?>
</body>
</html>