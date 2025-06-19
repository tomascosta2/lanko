'use strict';
var app = angular.module('Contact');

app.controller('ContactController', ['$scope', '$rootScope', '$http', 'ContactoServices', '$location',
  function ($scope, $rootScope, $http, ContactoServices, $location) {
    $scope.formularioActual = {};

    // Idioma (como estaba antes)
    cambiaLenguaje();
    $rootScope.$on("CAMBIO_LENGUAJE", function () {
      cambiaLenguaje();
    });

    function cambiaLenguaje() {
      ContactoServices.getFormFields($rootScope.esIngles ? 'en' : 'es', function (data) {
        $scope.formularioActual = angular.copy(data);
      });
    }

    $scope.PoneId = function (texto) {
      return texto.toLowerCase().replace(/ /g, '');
    };

    // NUEVO: función para enviar el formulario
    $scope.enviarFormulario = function () {
      let mensaje = '';
      let tieneDatos = false;

      $scope.formularioActual.grupos.forEach((grupo) => {
        let grupoTieneDatos = false;
        let grupoTexto = `<h4>${grupo.grupo}</h4><br>`;

        grupo.campos.forEach((campo) => {
          if (campo.value) {
            grupoTieneDatos = true;
            mensaje += `<strong>${campo.nombre}</strong><br>${campo.value}<br>`;
          }
        });

        if (grupoTieneDatos) {
          mensaje += grupoTexto;
          tieneDatos = true;
        }
      });

      if (tieneDatos) {
        // Podés usar $http directamente o seguir usando ContactoServices
        $http.post('send-mail.php', { mensaje: mensaje })
          .then(function (response) {
            console.log('✅ Éxito:', response.data);
            alert(response.data.msg || 'Formulario enviado correctamente');
            $location.path('/gracias'); // redirigí a la página que quieras
          })
          .catch(function (error) {
            console.error('❌ Error:', error);
            alert('Ocurrió un error al enviar el formulario.');
          });
      } else {
        alert('Por favor completá al menos un campo antes de enviar.');
      }
    };
  }
]);
