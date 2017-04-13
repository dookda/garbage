angular.module('app', ['ngRoute','app.service','app.controller'])

.config(function($routeProvider) {
  $routeProvider

  .when('/map', {
    templateUrl : 'map.html',
    controller  : 'mapController'
  })
  .when('/report', {
    templateUrl : 'report.html',
    controller  : 'reportController'
  })
  .when('/chart', {
    templateUrl : 'chart.html',
    controller  : 'chartController'
  })

  .when('/form', {
    templateUrl : 'form.html',
    controller  : 'formController'
  })

  .otherwise({redirectTo: '/map'});
})