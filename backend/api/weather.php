<?php
/**
 * Endpoint: /backend/api/weather.php
 * Mashup con la API pública de Open-Meteo (sin API key).
 * Permite consultar clima actual vía AJAX usando city o lat/lon.
 */

header('Content-Type: application/json');

$city = trim($_GET['city'] ?? '');
$latitude = isset($_GET['lat']) ? (float) $_GET['lat'] : null;
$longitude = isset($_GET['lon']) ? (float) $_GET['lon'] : null;

if (!$latitude || !$longitude) {
    // Si no llega lat/lon intentamos obtenerlos usando el servicio de geocodificación.
    $cityLookup = $city ?: 'Bogota';
    $geocodeUrl = sprintf(
        'https://geocoding-api.open-meteo.com/v1/search?name=%s&count=1&language=es&format=json',
        urlencode($cityLookup)
    );
    $geocodeResponse = fetchJson($geocodeUrl);

    if (!$geocodeResponse || empty($geocodeResponse['results'][0])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'No pudimos geolocalizar la ciudad.']);
        exit;
    }

    $latitude = (float) $geocodeResponse['results'][0]['latitude'];
    $longitude = (float) $geocodeResponse['results'][0]['longitude'];
    $city = $geocodeResponse['results'][0]['name'];
}

$weatherUrl = sprintf(
    'https://api.open-meteo.com/v1/forecast?latitude=%s&longitude=%s&current=temperature_2m,relative_humidity_2m,weather_code',
    $latitude,
    $longitude
);

$weatherResponse = fetchJson($weatherUrl);

if (!$weatherResponse || empty($weatherResponse['current'])) {
    http_response_code(502);
    echo json_encode(['success' => false, 'message' => 'Servicio de clima no disponible.']);
    exit;
}

$current = $weatherResponse['current'];
$code = (int) ($current['weather_code'] ?? 0);

echo json_encode([
    'success' => true,
    'city' => $city ?: 'Ubicación personalizada',
    'latitude' => $latitude,
    'longitude' => $longitude,
    'temperature_c' => $current['temperature_2m'] ?? null,
    'humidity' => $current['relative_humidity_2m'] ?? null,
    'weather_code' => $code,
    'description' => weatherCodeToText($code),
]);

/**
 * Descarga JSON usando cURL si existe o file_get_contents como fallback.
 */
function fetchJson(string $url): ?array
{
    if (function_exists('curl_init')) {
        $curl = curl_init($url);
        curl_setopt_array($curl, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 10,
        ]);
        $response = curl_exec($curl);
        curl_close($curl);
    } else {
        $context = stream_context_create([
            'http' => ['timeout' => 10],
        ]);
        $response = @file_get_contents($url, false, $context);
    }

    if (!$response) {
        return null;
    }

    $decoded = json_decode($response, true);
    return is_array($decoded) ? $decoded : null;
}

/**
 * Traduce códigos de Open-Meteo a texto amigable.
 */
function weatherCodeToText(int $code): string
{
    $map = [
        0 => 'Cielo despejado',
        1 => 'Mayormente despejado',
        2 => 'Parcialmente nublado',
        3 => 'Nublado',
        45 => 'Niebla',
        48 => 'Niebla escarchada',
        51 => 'Llovizna ligera',
        53 => 'Llovizna',
        55 => 'Llovizna intensa',
        61 => 'Lluvia ligera',
        63 => 'Lluvia moderada',
        65 => 'Lluvia fuerte',
        71 => 'Nieve ligera',
        73 => 'Nieve',
        75 => 'Nieve intensa',
        80 => 'Chaparrón ligero',
        81 => 'Chaparrón moderado',
        82 => 'Chaparrón intenso',
        95 => 'Tormenta eléctrica',
        96 => 'Tormenta eléctrica con granizo ligero',
        99 => 'Tormenta eléctrica con granizo fuerte',
    ];

    return $map[$code] ?? 'Condición no identificada';
}
