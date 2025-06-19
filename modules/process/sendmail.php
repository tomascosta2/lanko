<?php
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$logFile = __DIR__ . '/mail_debug.log';

if ($request && isset($request->mensaje)) {
    $mail = new PHPMailer(true);
    $logContent = "--------\n";
    $logContent .= "Fecha: " . date('Y-m-d H:i:s') . "\n";

    try {
        // Configuración SMTP Gmail
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'lankoexpediciones@gmail.com'; // TU MAIL
        $mail->Password   = 'jvegkynrxktgyhsw';       // CONTRASEÑA DE APLICACIÓN
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        // Configuración del mensaje
        $mail->setFrom('lankoexpediciones@gmail.com', 'Formulario Lanko');
        $mail->addAddress('tomascostapp@gmail.com');
        $mail->addReplyTo('lankoexpediciones@gmail.com');
        $mail->isHTML(true);
        $mail->Subject = 'Nueva Reserva';
        $mail->Body    = nl2br(htmlspecialchars($request->mensaje));
        $mail->AltBody = $request->mensaje;

        $logContent .= "To: tomascostapp@gmail.com\n";
        $logContent .= "Asunto: Nueva Reserva\n";
        $logContent .= "Mensaje:\n" . $request->mensaje . "\n";

        $mail->send();
        $result = ['success' => true, 'msg' => 'El mail se envió sin problema'];
    } catch (Exception $e) {
        $result = ['success' => false, 'msg' => "No se pudo enviar. Mailer Error: {$mail->ErrorInfo}"];
        $logContent .= "Error: {$mail->ErrorInfo}\n";
    }

    file_put_contents($logFile, $logContent . "Resultado: " . json_encode($result) . "\n", FILE_APPEND);
} else {
    $result = ['success' => false, 'msg' => 'No existe el parámetro mensaje o el JSON es inválido'];
}

header('Content-type: application/json');
echo json_encode($result);
?>
