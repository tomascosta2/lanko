'use strict';
var app = angular.module('Home').controller('HomeController', ['$scope', '$rootScope',
    function($scope, $rootScope) {
        $scope.getLanguage = function() {
        return $rootScope.esIngles;
    };
    }
]);