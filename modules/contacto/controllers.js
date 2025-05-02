'use strict';
var app = angular.module('Contact');
app.controller('ContactController', ['$scope', '$rootScope', '$http', 'ContactoServices','$location',
    function($scope, $rootScope, $http, ContactoServices,$location) {
        $scope.formularioActual = {};
        $scope.participantes = [{
            id: 0,
            name: "1"
        }, {
            id: 1,
            name: "2"
        }, {
            id: 2,
            name: "3"
        }, {
            id: 3,
            name: "4"
        }, {
            id: 4,
            name: "5"
        }, {
            id: 5,
            name: "6"
        }, {
            id: 6,
            name: "7"
        }, {
            id: 7,
            name: "8"
        }, {
            id: 8,
            name: "9"
        }, {
            id: 9,
            name: "10"
        }, {
            id: 10,
            name: "11"
        }, {
            id: 11,
            name: "12"
        }, {
            id: 12,
            name: "13"
        }, {
            id: 13,
            name: "14"
        }, {
            id: 14,
            name: "15"
        }, {
            id: 15,
            name: "16"
        }, {
            id: 16,
            name: "17"
        }, {
            id: 17,
            name: "18"
        }, {
            id: 18,
            name: "19"
        }, {
            id: 19,
            name: "20"
        }];
        $scope.selectedParticipante = $scope.participantes[0];
        cambiaLenguaje();
        $rootScope.$on("CAMBIO_LENGUAJE", function() {
            cambiaLenguaje();
        });

        function cambiaLenguaje() {
            $scope.formularios = [];
            ContactoServices.getFormFields($rootScope.esIngles ? 'en' : 'es', function(data) {
                for (var i = 0; i <= 20; i++) {
                    $scope.formularios.push(angular.copy(data));
                }
                $scope.formularioActual = $scope.formularios[0];
            });
        }
        $scope.PoneId = function(texto) {
            var res = texto.toLowerCase();
            res = res.replace(/ /g, '');
            return res;
        }
        $scope.CambiaParticipante = function() {
            console.log($scope.selectedParticipante);
            $scope.formularioActual = $scope.formularios[$scope.selectedParticipante.id];
        }
        $scope.go = function(path) {
        	var mensaje = "";
        	$scope.formularios.forEach(function(participante){
        		var enviaParticipante = false;
        		var txtParticipante = "";
        		participante.grupos.forEach(function(grupo){
        			txtParticipante+="<h4>"+grupo.grupo+"</h4><br>";
        			grupo.campos.forEach(function(campo){
        				if(campo.value){
	        				if(campo.nombre=='Nombre y Apellido'){
	        					enviaParticipante = true;
	        				}
	        				txtParticipante+="<strong>"+campo.nombre+"</strong><br>";
	        				txtParticipante+=campo.value+"<br>";
        				}
        			});
        		});
        		if(enviaParticipante){
       				mensaje+=txtParticipante;	
        		}
        	});
        	if(mensaje!=""){
	        	ContactoServices.sendMail(mensaje,function(response){
	            	console.log(response);
	            });
	            $location.path(path);
        	}
        };
    }
]);