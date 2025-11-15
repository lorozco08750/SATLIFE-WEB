<?php
/**
 * Endpoint: /backend/auth/logout.php
 * Cierra la sesión activa y devuelve JSON de confirmación.
 */

session_start();
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
    exit;
}

session_unset();
session_destroy();

echo json_encode(['success' => true, 'message' => 'Sesión cerrada.']);
