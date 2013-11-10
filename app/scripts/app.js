'use strict';

angular.module('pefApp', ['ui.bootstrap', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'views/page.html',
      controller: 'PageCtrl'
    });
  });