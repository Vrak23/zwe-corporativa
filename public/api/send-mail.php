<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Método no permitido. Solo se aceptan solicitudes POST.'
    ]);
    exit();
}

// Get JSON input
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    // Check $_POST if not JSON
    $data = $_POST;
}

// Honeypot spam protection
if (!empty($data['_gotcha'])) {
    // Pretend success for bots
    echo json_encode([
        'success' => true,
        'message' => 'Mensaje recibido correctamente.'
    ]);
    exit();
}

// Extract and sanitize fields
$nombre   = isset($data['nombre'])   ? trim(strip_tags($data['nombre'])) : '';
$correo   = isset($data['correo'])   ? trim(filter_var($data['correo'], FILTER_SANITIZE_EMAIL)) : '';
$telefono = isset($data['telefono']) ? trim(strip_tags($data['telefono'])) : '';
$ruc      = isset($data['ruc'])      ? trim(strip_tags($data['ruc'])) : '';
$servicio = isset($data['servicio']) ? trim(strip_tags($data['servicio'])) : '';
$mensaje  = isset($data['mensaje'])  ? trim(strip_tags($data['mensaje'])) : '';

// Validation
$errors = [];

if (empty($nombre)) {
    $errors[] = 'El nombre es obligatorio.';
}

if (empty($correo) || !filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'El correo electrónico es inválido o está vacío.';
}

if (empty($telefono)) {
    $errors[] = 'El teléfono es obligatorio.';
}

if (empty($servicio)) {
    $errors[] = 'Debe seleccionar un servicio.';
}

if (empty($mensaje)) {
    $errors[] = 'El mensaje no puede estar vacío.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => implode(' ', $errors),
        'errors'  => $errors
    ]);
    exit();
}

// Destination email
$destinatario = 'ventas@zwecorporativa.com';
$asunto = "Nuevo Mensaje Web: " . ($servicio ? $servicio : "Contacto") . " - " . $nombre;

// Build HTML email body
$fechaHora = date('d/m/Y H:i:s');
$ipCliente = $_SERVER['REMOTE_ADDR'] ?? 'No disponible';

$cuerpoHtml = '
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: "Segoe UI", Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #333; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e1e6ed; }
        .header { background: #233158; color: #ffffff; padding: 25px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; color: #ffffff; letter-spacing: 0.5px; }
        .header p { margin: 6px 0 0; color: #fcbb07; font-size: 14px; font-weight: bold; }
        .content { padding: 30px; }
        .field-group { margin-bottom: 18px; border-bottom: 1px solid #edf2f7; padding-bottom: 14px; }
        .field-group:last-child { border-bottom: none; }
        .label { font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .value { font-size: 15px; color: #1e293b; font-weight: 500; }
        .message-box { background: #f8fafc; border-left: 4px solid #fcbb07; padding: 15px; border-radius: 4px; font-size: 14.5px; line-height: 1.6; color: #334155; white-space: pre-wrap; }
        .footer { background: #0f172a; color: #94a3b8; padding: 15px 30px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>ZWE Corporativa</h1>
            <p>Nuevo Prospecto / Mensaje desde Formulario Web</p>
        </div>
        <div class="content">
            <div class="field-group">
                <div class="label">Nombre del Cliente / Empresa</div>
                <div class="value">' . htmlspecialchars($nombre) . '</div>
            </div>
            <div class="field-group">
                <div class="label">Correo Electrónico</div>
                <div class="value"><a href="mailto:' . htmlspecialchars($correo) . '" style="color:#2563eb; text-decoration:none;">' . htmlspecialchars($correo) . '</a></div>
            </div>
            <div class="field-group">
                <div class="label">Teléfono / WhatsApp</div>
                <div class="value"><a href="tel:' . htmlspecialchars($telefono) . '" style="color:#2563eb; text-decoration:none;">' . htmlspecialchars($telefono) . '</a></div>
            </div>
            ' . (!empty($ruc) ? '
            <div class="field-group">
                <div class="label">RUC / DNI</div>
                <div class="value">' . htmlspecialchars($ruc) . '</div>
            </div>' : '') . '
            <div class="field-group">
                <div class="label">Servicio de Interés</div>
                <div class="value" style="color:#0f766e; font-weight:bold;">' . htmlspecialchars($servicio) . '</div>
            </div>
            <div class="field-group">
                <div class="label">Mensaje / Requerimiento</div>
                <div class="message-box">' . nl2br(htmlspecialchars($mensaje)) . '</div>
            </div>
        </div>
        <div class="footer">
            Enviado el ' . $fechaHora . ' | IP: ' . $ipCliente . '
        </div>
    </div>
</body>
</html>
';

// Email headers
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: ZWE Corporativa <ventas@zwecorporativa.com>';
$headers[] = 'Reply-To: ' . $nombre . ' <' . $correo . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Attempt to send email
$enviado = @mail($destinatario, $asunto, $cuerpoHtml, implode("\r\n", $headers));

if ($enviado) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => '¡Tu mensaje ha sido enviado exitosamente a ' . $destinatario . '! Nos comunicaremos contigo a la brevedad.'
    ]);
} else {
    // If mail() failed on local host without configured sendmail, return structured response
    // still providing the user with full details
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'No se pudo enviar el correo a través del servidor en este momento. Por favor contáctanos directamente a ' . $destinatario . ' o por WhatsApp.',
        'targetEmail' => $destinatario
    ]);
}
