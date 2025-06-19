<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

file_put_contents(__DIR__ . '/debug.log', "Iniciado script\n", FILE_APPEND);

require __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$logFile = __DIR__ . '/debug.log';

if ($request && isset($request->mensaje)) {
    $mail = new PHPMailer(true);

    try {
        file_put_contents($logFile, "Preparando envío...\n", FILE_APPEND);

        // Configuración SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'contacto@lanko.com.ar'; // Tu correo
        $mail->Password = 'jveg kynr xktg yhsw';      // Contraseña de aplicación
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;

        // Email
        $mail->setFrom('contacto@lanko.com.ar', 'Formulario Lanko');
        $mail->addAddress('tomascostapp@gmail.com');
        $mail->isHTML(true);
        $mail->Subject = 'Nueva Reserva';
        $mail->Body = $request->mensaje;
        $mail->AltBody = strip_tags($request->mensaje);

        $mail->send();

        file_put_contents($logFile, "✅ Enviado correctamente\n", FILE_APPEND);
        echo json_encode(['success' => true, 'msg' => 'Correo enviado con éxito']);

    } catch (Exception $e) {
        $error = "❌ Error al enviar: " . $mail->ErrorInfo . "\n";
        file_put_contents($logFile, $error, FILE_APPEND);
        echo json_encode(['success' => false, 'msg' => $mail->ErrorInfo]);
    }

} else {
    file_put_contents($logFile, "❌ JSON inválido o sin mensaje\n", FILE_APPEND);
    echo json_encode(['success' => false, 'msg' => 'No se recibió el mensaje']);
}
