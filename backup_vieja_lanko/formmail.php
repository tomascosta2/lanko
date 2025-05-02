<?php
/*
Datos que hay que colocar en cada formulario que se linkeará a este archivo....
El Script también espera que se le pase una variable p, dependiendo de su valor la página de gracias se mostrará en una ventana popup o no.
        <!---- AREA DE DATOS ---->
        <INPUT name=destino type=hidden value="info@bodegaweinert.com">
        <INPUT name=desde type=hidden value="bodegaweinert">		
        <INPUT name=asunto type=hidden value="Consulta desde  bodegaweinert.com">
        <INPUT name=ok type=hidden value="gracias.html">
       [<INPUT name=popup type=hidden value="1"> ] // dato opcional
       [<INPUT name=popup_return type=hidden value="URL-PAGINA"> ]  // obligatorio si es popup=1
		<INPUT name="requeridos" type="hidden" value="email,apellido,nombre">
        <!-- FIN AREA DE DATOS -->
*/
// VALIDA QUE LOS DATOS QUE SE INGRESEN EN EL FORMULARIO SEAN CORRECTOS
if(isset($_POST["requeridos"])){
	$validar = explode(",",$_POST["requeridos"]);
	$cuenta = count($validar);
	$validacion = 1;
	foreach ($_POST as $nombre=>$valor) {
		if ($nombre == "destino" || $nombre == "popup" || $nombre == "popup_return" || $nombre == "requeridos" || $nombre == "asunto" || $nombre == "ok" || $nombre == "boton_enviar_x" || $nombre == "boton_enviar_y") {
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
	if ($nombre == "destino" || $nombre == "popup" || $nombre == "popup_return" || $nombre == "requeridos" || $nombre == "asunto" || $nombre == "ok" || $nombre == "boton_enviar_x" || $nombre == "boton_enviar_y") {
	}else{
		$MENSAJE .= strtoupper($nombre)." : ".$valor."\n";
	}
}

//ENVIO DE CORREO
$from = sprintf("'%s' <%s>", $_POST["nombre"], $_POST["email"]) ;
if(mail($_POST["destino"], $_POST["asunto"], $MENSAJE, "FROM: $from")){  //,"Content-Type:text/html;CHARSET=iso-8859-8-i\nReply-To: $email\n" 
	$location  = "Location: ".$_POST["ok"];
	if(!$popup){
		header($location);
	}else{
		echo("<SCRIPT LANGUAGE=\"JavaScript\">setTimeout(\"window.location.href='".$_POST["popup_return"]."'\",1);open('".$_POST["ok"]."',\"VentantaPopUp\", \"toolbar=no,directories=no,menubar=no,width=350,height=200,scrollbars=no\");</script>");
	}
}else{
	echo "&nbsp;<font color=#ff0000>El envio no se logró realizar satistactoriamente</font><br>";
}
?>