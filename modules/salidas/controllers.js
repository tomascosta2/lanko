'use strict';
var app = angular.module('LankoApp');
app.controller('SalidasController', ['$scope', '$rootScope', '$routeParams', 'SalidasServices',
    function($scope, $rootScope, $routeParams, SalidasServices) {
        $scope.salida = {};
        $scope.tipo = $routeParams.tipo;
        cambiaDatos();
        $rootScope.$on("CAMBIO_LENGUAJE", function() {
            cambiaDatos();
        });

        function cambiaDatos() {
            SalidasServices.getSalidas($scope.tipo, $rootScope.esIngles ? 'en' : 'es', function(data) {
                $scope.salida = data;
            });
        }
    }
]).controller('DetalleSalidaController', ['$scope', '$rootScope', '$routeParams', 'SalidasServices',
    function($scope, $rootScope, $routeParams, SalidasServices) {
        $scope.salida = {};
        $scope.tipo = $routeParams.tipo;
        $scope.id = $routeParams.id;
        cambiaDatos();
        $rootScope.$on("CAMBIO_LENGUAJE", function() {
            cambiaDatos();
        });

        function cambiaDatos() {
            SalidasServices.getSalidaDetalle($scope.tipo, $scope.id, $rootScope.esIngles ? 'en' : 'es', function(data) {
                $scope.salida = data;
            });
        }

        $scope.AmpliarImagen = function(clickEvent) {
            //console.log(url);
            console.log(clickEvent.event.target);
            $scope.foto_url = clickEvent.event.target.attributes.src.value.replace("c.",".");
        }
    }
]);