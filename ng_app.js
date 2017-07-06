angular.module('app', ['ngRoute', 'app.service', 'app.controller'])

  .config(function ($routeProvider) {
    $routeProvider

      .when('/login', {
        templateUrl: 'login.html',
        controller: 'loginCtrl'
      })

      .when('/register', {
        templateUrl: 'register.html',
        controller: 'registerCtrl'
      })

      .when('/map', {
        templateUrl: 'map.html',
        controller: 'mapCtrl'
      })

      .when('/cal', {
        templateUrl: 'cal.html',
        controller: 'calCtrl'
      })

      .when('/report', {
        templateUrl: 'report.html',
        controller: 'reportCtrl'
      })

      .when('/form', {
        templateUrl: 'form.html',
        controller: 'formCtrl'
      })
      
      .when('/chart', {
        templateUrl: 'chart.html',
        controller: 'chartCtrl'
      })
      .otherwise({ redirectTo: '/map' });
  })