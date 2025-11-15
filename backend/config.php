<?php
/**
 * Configuración común de PDO para el backend SATLIFE.
 *
 * Cómo ejecutar la carpeta /backend en XAMPP/LAMP:
 * 1. Copia o clona el repositorio dentro de htdocs (Windows) o /var/www/html (Linux).
 * 2. Importa backend/db.sql en MySQL (phpMyAdmin o mysql CLI) para crear la base satlife_db.
 * 3. Actualiza las credenciales $dbUser y $dbPass si tu instalación usa otros valores.
 * 4. Inicia Apache + MySQL desde XAMPP/LAMP y accede a http://localhost/SATLIFE-WEB/backend/.
 */

$dbHost = getenv('SATLIFE_DB_HOST') ?: '127.0.0.1';
$dbName = getenv('SATLIFE_DB_NAME') ?: 'satlife_db';
$dbUser = getenv('SATLIFE_DB_USER') ?: 'root';
$dbPass = getenv('SATLIFE_DB_PASS') ?: '';
$dbCharset = 'utf8mb4';

/**
 * Retorna una instancia PDO lista para usarse en los endpoints.
 */
function getSatlifePDO(): PDO
{
    static $pdo = null;

    if ($pdo instanceof PDO) {
        return $pdo;
    }

    global $dbHost, $dbName, $dbUser, $dbPass, $dbCharset;

    $dsn = "mysql:host={$dbHost};dbname={$dbName};charset={$dbCharset}";

    try {
        $pdo = new PDO($dsn, $dbUser, $dbPass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (PDOException $exception) {
        http_response_code(500);
        die(json_encode([
            'success' => false,
            'message' => 'Error al conectar con la base de datos.',
            'details' => $exception->getMessage(),
        ]));
    }

    return $pdo;
}
