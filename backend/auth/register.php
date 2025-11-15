<?php
/**
 * Endpoint: /backend/auth/register.php
 * Crea usuarios en la tabla `users` mediante AJAX.
 * Retorna JSON con success/message para que script.js muestre el resultado.
 */

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
    exit;
}

require_once __DIR__ . '/../config.php';

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$password = $_POST['password'] ?? '';

if (!$name || !$email || !$password) {
    echo json_encode([
        'success' => false,
        'message' => 'Nombre, correo y contraseña son obligatorios.',
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Correo no válido.']);
    exit;
}

$pdo = getSatlifePDO();

try {
    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = :email LIMIT 1');
    $stmt->execute(['email' => $email]);
    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'El correo ya está registrado.']);
        exit;
    }

    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    $insert = $pdo->prepare(
        'INSERT INTO users (name, email, phone, password_hash) 
         VALUES (:name, :email, :phone, :password_hash)'
    );
    $insert->execute([
        'name' => $name,
        'email' => $email,
        'phone' => $phone ?: null,
        'password_hash' => $passwordHash,
    ]);

    echo json_encode(['success' => true, 'message' => 'Registro exitoso.']);
} catch (PDOException $exception) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'No pudimos crear el usuario.',
        'details' => $exception->getMessage(),
    ]);
}
