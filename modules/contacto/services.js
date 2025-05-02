'use strict';
angular.module('LankoApp').service('ContactoServices', ['$http',
    function($http) {
        this.getFormFields = function(lenguaje, callback) {
            var publicaciones = $http.get('modules/data/formulario_reserva.' + lenguaje + '.json');
            publicaciones.success(function(data) {
                callback(data);
            });
        };
        var headerApi = 'Content-Type: application/json\nAccept: application/json\nAuthorization: None'; //\nAccess-Control-Expose-Headers: Set-Cookie';
        this.sendMail = function(mensaje, callback) {
            var headersRequest = {};
            headersRequest = parseHeaders(headerApi);
            $http.post('modules/process/sendmail.php', {mensaje:mensaje}, {
                headers: headersRequest
            }).then(function(response) {
                callback(response.data);
            }, function(response) {
                callback(response.data);
            }).catch(function(response) {
                console.log("Exception:" + response);
            });
        };

        /*
        Convierte un string en formato:

        Content-Type: application/json
        Accept: application/json, text/plain
        Authorization: None
        Access-Control-Expose-Headers: Set-Cookie

        a un objeto para pasar como header a las llamadas 
         */
        var parseHeaders = function(headerStr) {
            var headers = {};
            if (!headerStr) {
                return headers;
            }
            var headerPairs = headerStr.split('\n');
            for (var i = 0; i < headerPairs.length; i++) {
                var headerPair = headerPairs[i];
                // Can't use split() here because it does the wrong thing
                // if the header value has the string ": " in it.
                var index = headerPair.indexOf(': ');
                if (index > 0) {
                    var key = $.trim(headerPair.substring(0, index));
                    var val = $.trim(headerPair.substring(index + 2));
                    headers[key] = val;
                }
            }
            return headers;
        }
    }
]);