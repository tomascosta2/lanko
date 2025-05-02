'use strict';
var app = angular.module('LankoApp').controller('MenuController', ['$scope', '$rootScope',
    function($scope, $rootScope) {
        $scope.cambiaLenguaje = function() {
            $rootScope.esIngles = !$rootScope.esIngles;
            $rootScope.$broadcast('CAMBIO_LENGUAJE');
        }
    }
]);