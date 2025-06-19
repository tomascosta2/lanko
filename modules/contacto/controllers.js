'use strict';
var app = angular.module('Contact');
app.controller('ReservaController', function ($scope, $http) {
  // Ejemplo de estructura inicial del formulario
  $scope.formularioActual = {
    grupos: [
      {
        grupo: 'Datos personales',
        campos: [
          { nombre: 'Nombre', slug: 'nombre', value: '', placeholder: 'Tu nombre' },
          { nombre: 'Email', slug: 'email', value: '', placeholder: 'Tu email' }
        ]
      },
      {
        grupo: 'Detalles de la reserva',
        campos: [
          { nombre: 'Fecha', slug: 'fecha', value: '', placeholder: 'DD/MM/AAAA' },
          { nombre: 'Horario', slug: 'horario', value: '', placeholder: 'HH:MM' }
        ]
      }
    ]
  };

  // Función para enviar el formulario
  $scope.enviarFormulario = function () {
    let mensaje = '';

    $scope.formularioActual.grupos.forEach((grupo) => {
      mensaje += `\n<strong>${grupo.grupo}</strong>\n`;
      grupo.campos.forEach((campo) => {
        mensaje += `${campo.nombre}: ${campo.value || ''}\n`;
      });
      mensaje += '\n';
    });

    // Enviar al backend
    $http.post('send-mail.php', { mensaje: mensaje })
      .then(function (response) {
        console.log('✅ Éxito:', response.data);
        alert(response.data.msg || 'Formulario enviado correctamente');
      })
      .catch(function (error) {
        console.error('❌ Error al enviar:', error);
        alert('Ocurrió un error al enviar el formulario.');
      });
  };

  // (Opcional) Detectar idioma
  $scope.esIngles = false; // o true según el idioma por defecto
});
