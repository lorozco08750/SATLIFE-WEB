<?php
/**
 * Endpoint: /backend/api/visits.php
 * Tabla utilizada: `visits`.
 * Acciones via query string:
 *   - action=register&page=index  -> registra una visita.
 *   - action=count&page=index     -> devuelve total de visitas por página.
 */

header('Content-Type: application/json');
require_once __DIR__ . '/../config.php';
$pdo = getSatlifePDO();

$action = $_GET['action'] ?? 'register';
$page = trim($_GET['page'] ?? 'index');

if ($page === '') {
    $page = 'index';
}

try {
    if ($action === 'count') {
        $stmt = $pdo->prepare('SELECT COUNT(*) AS total FROM visits WHERE page = :page');
        $stmt->execute(['page' => $page]);
        $result = $stmt->fetch();
        echo json_encode([
            'success' => true,
            'page' => $page,
            'total_visits' => (int) ($result['total'] ?? 0),
        ]);
        exit;
    }

    // action register (default)
    $stmt = $pdo->prepare(
        'INSERT INTO visits (page, ip_address) VALUES (:page, :ip_address)'
    );
    $stmt->execute([
        'page' => $page,
        'ip_address' => $_SERVER['REMOTE_ADDR'] ?? null,
    ]);

    echo json_encode(['success' => true, 'message' => 'Visita registrada.']);
} catch (PDOException $exception) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'No pudimos procesar la visita.',
        'details' => $exception->getMessage(),
    ]);
}
