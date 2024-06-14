<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

if (isset($_GET['city'])) {
    $city = urlencode($_GET['city']);
    $apiKey = 'f5c3d7a488fd485ba7d21641241406';  // Replace with your actual API key
    $url = "http://api.weatherapi.com/v1/search.json?key=$apiKey&q=$city";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);
    
    $response = curl_exec($ch);
    
    if (curl_errno($ch)) {
        echo json_encode(['error' => 'Curl error: ' . curl_error($ch)]);
        curl_close($ch);
        exit();
    }
    
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode >= 400) {
        echo json_encode(['error' => 'HTTP error: ' . $httpCode, 'response' => $response]);
        exit();
    }
    
    echo $response;
} else {
    echo json_encode(['error' => 'City parameter missing']);
}
?>
