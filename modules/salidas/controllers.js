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

        // Nueva galeria

        $scope.AmpliarImagen = function(clickEvent, index) {
            $scope.currentIndex = index;
            var foto = $scope.salida.galeria[index];
            $scope.foto_url = foto.imagen.replace("c.",".");
            $scope.foto_descipcion = foto.titulo;
        };

        $scope.nextImage = function() {
            if ($scope.currentIndex < $scope.salida.galeria.length - 1) {
                $scope.currentIndex++;
                $scope.updateModalImage();
            }
        };
        
        $scope.prevImage = function() {
            if ($scope.currentIndex > 0) {
                $scope.currentIndex--;
                $scope.updateModalImage();
            }
        };
        
        $scope.updateModalImage = function() {
            var foto = $scope.salida.galeria[$scope.currentIndex];
            $scope.foto_url = foto.imagen.replace("c.",".");
            $scope.foto_descipcion = foto.titulo;
        };
    }
]);