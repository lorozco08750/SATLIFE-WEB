<?php
/**
 * Endpoint: /backend/api/contacts.php
 * CRUD básico de la tabla `contacts` asociado al usuario autenticado.
 * Métodos soportados:
 *  - GET  : devuelve lista de contactos del usuario.
 *  - POST : crea un nuevo contacto.
 *  - DELETE (opcional) : elimina un contacto propio.
 */

session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Debes iniciar sesión.']);
    exit;
}

require_once __DIR__ . '/../config.php';
$pdo = getSatlifePDO();
$userId = (int) $_SESSION['user_id'];

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        fetchContacts($pdo, $userId);
        break;
    case 'POST':
        createContact($pdo, $userId);
        break;
    case 'DELETE':
        deleteContact($pdo, $userId);
        break;
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
}

/**
 * Devuelve todos los contactos del usuario autenticado.
 */
function fetchContacts(PDO $pdo, int $userId): void
{
    try {
        $stmt = $pdo->prepare(
            'SELECT id, name, email, phone, notes, created_at 
             FROM contacts WHERE user_id = :user_id ORDER BY created_at DESC'
        );
        $stmt->execute(['user_id' => $userId]);
        $contacts = $stmt->fetchAll();

        echo json_encode(['success' => true, 'data' => $contacts]);
    } catch (PDOException $exception) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error al consultar contactos.',
            'details' => $exception->getMessage(),
        ]);
    }
}

/**
 * Inserta un nuevo contacto relacionado al usuario autenticado.
 */
function createContact(PDO $pdo, int $userId): void
{
    $payload = collectPayload();

    $name = trim($payload['name'] ?? '');
    $email = trim($payload['email'] ?? '');
    $phone = trim($payload['phone'] ?? '');
    $notes = trim($payload['notes'] ?? '');

    if (!$name) {
        echo json_encode(['success' => false, 'message' => 'El nombre del contacto es obligatorio.']);
        return;
    }

    if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Correo del contacto no válido.']);
        return;
    }

    try {
        $stmt = $pdo->prepare(
            'INSERT INTO contacts (user_id, name, email, phone, notes)
             VALUES (:user_id, :name, :email, :phone, :notes)'
        );
        $stmt->execute([
            'user_id' => $userId,
            'name' => $name,
            'email' => $email ?: null,
            'phone' => $phone ?: null,
            'notes' => $notes ?: null,
        ]);

        echo json_encode(['success' => true, 'message' => 'Contacto creado correctamente.']);
    } catch (PDOException $exception) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'No pudimos guardar el contacto.',
            'details' => $exception->getMessage(),
        ]);
    }
}

/**
 * Elimina un contacto perteneciente al usuario autenticado.
 */
function deleteContact(PDO $pdo, int $userId): void
{
    parse_str(file_get_contents('php://input'), $payload);
    $contactId = isset($payload['id']) ? (int) $payload['id'] : 0;

    if ($contactId <= 0) {
        echo json_encode(['success' => false, 'message' => 'ID de contacto inválido.']);
        return;
    }

    try {
        $stmt = $pdo->prepare('DELETE FROM contacts WHERE id = :id AND user_id = :user_id');
        $stmt->execute(['id' => $contactId, 'user_id' => $userId]);

        if ($stmt->rowCount() === 0) {
            echo json_encode(['success' => false, 'message' => 'No se encontró el contacto.']);
            return;
        }

        echo json_encode(['success' => true, 'message' => 'Contacto eliminado.']);
    } catch (PDOException $exception) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error al eliminar el contacto.',
            'details' => $exception->getMessage(),
        ]);
    }
}

/**
 * Permite recibir payload JSON o form-data sin duplicar lógica.
 */
function collectPayload(): array
{
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    if (stripos($contentType, 'application/json') !== false) {
        $rawInput = file_get_contents('php://input');
        $decoded = json_decode($rawInput, true);
        return is_array($decoded) ? $decoded : [];
    }

    return $_POST;
}
