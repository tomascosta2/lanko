'use strict';
angular.module('LankoApp').service('ContentServices', ['$http',
    function($http) {
        this.getContent= function(tipo, lenguaje, callback) {
            var contenido = $http.get('modules/data/'+ tipo + "." + lenguaje + '.json');
            contenido.success(function(data) {
                var salida = data[tipo];
                callback(salida);
            });
        };
    }
]);