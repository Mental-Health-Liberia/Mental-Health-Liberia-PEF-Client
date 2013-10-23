'use strict';

angular.module('pefApp', ['ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'views/page.html',
      controller: 'PageCtrl'
    })
    .otherwise({
      redirectTo: '/',
    });
  });