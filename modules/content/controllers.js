'use strict';
var app = angular.module('LankoApp');
app.controller('ContentController', ['$scope', '$rootScope', '$location', 'ContentServices',
    function($scope, $rootScope, $location, ContentServices) {
        $scope.contenido = {};
        $scope.contenidoActual = 0;
        $scope.tipo = $location.path().replace("/","");
        cambiaDatos();
        $rootScope.$on("CAMBIO_LENGUAJE", function() {
            cambiaDatos();
        });

        function cambiaDatos() {
            ContentServices.getContent($scope.tipo, $rootScope.esIngles ? 'en' : 'es', function(data) {
                $scope.contenido = data;
            });
        }

        $scope.cambiaSeccion = function(index){
            $scope.contenidoActual = index;
        };
    }
]);