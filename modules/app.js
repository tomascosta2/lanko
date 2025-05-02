'use strict';
(function() {
    // declare modules
    angular.module('Home', []);
    angular.module('Contact', []);
    var app = angular.module('LankoApp', ['Home', 'Contact', 'ngRoute','ngSanitize']).config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'modules/home/views/home.html'
        })
        .when('/salidas/:tipo', {
            controller: 'SalidasController',
            templateUrl: 'modules/salidas/views/salidas.html'
        })
        .when('/salida/:tipo/:id', {
            controller: 'DetalleSalidaController',
            templateUrl: 'modules/salidas/views/salida.html'
        })
        .when('/servicios', {
            controller: 'ContentController',
            templateUrl: 'modules/content/views/content.html'
        })
        .when('/nosotros', {
            controller: 'ContentController',
            templateUrl: 'modules/content/views/content.html'
        })
        .when('/contacto', {
            controller: 'ContactController',
            templateUrl: 'modules/contacto/views/form.html'
        })
        .otherwise({
            redirectTo: '/'
        });
    }]);
    app.directive('backImg', function() {
        var res = function(scope, element, attrs) {
            var url = attrs.backImg;
            attrs.$observe('backImg', function(url) {
                element.css({
                    'background-image': 'url(' + url + ')',
                    'background-size': 'cover'
                });
            });
        };
        return res;
    });
    app.directive('showtab', function() {
        return {
            link: function(scope, element, attrs) {
                element.click(function(e) {
                    e.preventDefault();
                    $(element).tab('show');
                });
            }
        };
    });
    app.run(function($rootScope) {
        // WOW.js Scrolling Animations
        new WOW().init();
        window.onscroll = function() {
            if (window.pageYOffset < 60) {
                $('.navbar').fadeIn();
            } else {
                $('.navbar').fadeOut();
            }
        };
        $rootScope.esIngles = false;
    });
})();