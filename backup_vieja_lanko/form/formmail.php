<?php
// VALIDA QUE LOS DATOS QUE SE INGRESEN EN EL FORMULARIO SEAN CORRECTOS
if(isset($_POST["requeridos"])){
	$validar = explode(",",$_POST["requeridos"]);
	$cuenta = count($validar);
	$validacion = 1;
	foreach ($_POST as $nombre=>$valor) {
		if ($nombre == "destino" || $nombre == "requeridos" || $nombre == "asunto" || $nombre == "ok" || $nombre == "boton_enviar_x" || $nombre == "boton_enviar_y") {
		}else{
			for($i=0; $i<=$cuenta; $i++){
				if($nombre == $validar[$i]){
					if($valor == NULL){
						echo("<SCRIPT LANGUAGE=\"JavaScript\">alert(\"Algun dato requerido no se completó, intenteló nuevamente.\");msg=history.go(-1);</script>");
						exit();
					}
				}
			}
		}
	}
}

// GUARDA EN EL CUERPO DEL MENSAJE LOS DATOS QUE EL USUARIO INGRESA EN EL FORMULARIO
foreach ($_POST as $nombre=>$valor) {
	if ($nombre == "destino" || $nombre == "requeridos" || $nombre == "asunto" || $nombre == "ok" || $nombre == "boton_enviar_x" || $nombre == "boton_enviar_y") {
	}else{
		$MENSAJE .= strtoupper($nombre)." : ".$valor."\n";
	}
}

//ENVIO DE CORREO
if(@mail($_POST["destino"], $_POST["asunto"], $MENSAJE, "From: ".$_POST["desde"]."")){  //,"Content-Type:text/html;CHARSET=iso-8859-8-i\nReply-To: $email\n" 
	header("Location: ".$_POST["ok"]."");
}else{
	echo "&nbsp;<font color=#ff0000>El envio no se logró realizar satistactoriamente</font><br>";
}
?>