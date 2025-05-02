'use strict';
angular.module('LankoApp').service('SalidasServices', ['$http','$filter',
    function($http,$filter) {
        this.getSalidas = function(tipo, lenguaje, callback) {
            var publicaciones = $http.get('modules/data/salidas.' + lenguaje + '.json');
            publicaciones.success(function(data) {
                callback(data[tipo]);
            });
        };
        this.getSalidaDetalle = function(tipo, id, lenguaje, callback) {
            var publicaciones = $http.get('modules/data/salidas.' + lenguaje + '.json');
            publicaciones.success(function(data) {
                var salida = $filter('filter')(data[tipo].salidas, {id: id})[0];
                callback(salida);
            });
        };
    }
]);