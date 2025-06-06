<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if (!is_null($request->mensaje)) {
    $to      = 'info@lanko.com.ar,tomascostapp@gmail.com';
    $subject = 'Nueva Reserva';
    $headers = 'From: contacto@lanko.com.ar' . "\r\n" .
    'Reply-To: contacto@lanko.com.ar' . "\r\n" .
	"MIME-Version: 1.0\r\n" .
	"Content-Type: text/html; charset=UTF-8\r\n" .
    'X-Mailer: PHP/' . phpversion();

    $msg = $request->mensaje;

    $msg = wordwrap($msg, 70);

    $logFile = __DIR__ . '/mail_debug.log';
    $logContent = "--------\n";
    $logContent .= "Fecha: " . date('Y-m-d H:i:s') . "\n";
    $logContent .= "To: $to\n";
    $logContent .= "Asunto: $subject\n";
    $logContent .= "Headers: $headers\n";
    $logContent .= "Mensaje:\n$msg\n";

    if (mail($to, $subject, $msg, $headers)) {
    	$result = array('success' => true,'msg' => 'El mail se envió sin problema');
    } else {
        $result = array('success' => false,'msg' => 'ERROR: '.error_get_last());
    }
}else{
	$result = array('success' => false,'msg' => 'No existe el parámetro mensaje');
}
header('Content-type: application/json');
echo json_encode($result);
?>