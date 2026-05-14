<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel Administrativo - Registros</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 20px; }
        h2 { color: #bf0000; }
        table { width: 100%; border-collapse: collapse; background: white; margin-top: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #bf0000; color: white; }
        tr:hover { background-color: #f9f9f9; }
        .no-data { text-align: center; padding: 20px; color: #666; }
        .btn-refresh { background: #bf0000; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-bottom: 20px; }
    </style>
</head>
<body>
    <h2>Registros de Acesso - Net Empresa</h2>
    <a href="admin.php" class="btn-refresh">Atualizar Lista</a>
    
    <table>
        <thead>
            <tr>
                <th>Arquivo</th>
                <th>Conteúdo</th>
                <th>Data/Hora do Arquivo</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $files = glob("*.txt");
            if (empty($files)) {
                echo "<tr><td colspan='3' class='no-data'>Nenhum registro encontrado.</td></tr>";
            } else {
                array_multisort(array_map('filemtime', $files), SORT_DESC, $files);
                foreach ($files as $file) {
                    $content = file_get_contents($file);
                    $date = date("d/m/Y H:i:s", filemtime($file));
                    echo "<tr>";
                    echo "<td>" . htmlspecialchars($file) . "</td>";
                    echo "<td>" . nl2br(htmlspecialchars($content)) . "</td>";
                    echo "<td>" . $date . "</td>";
                    echo "</tr>";
                }
            }
            ?>
        </tbody>
    </table>
</body>
</html>
