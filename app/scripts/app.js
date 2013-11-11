'use strict';

angular.module('pefApp', ['ui.bootstrap', 'ui.router', 'ngSanitize'])
  .run(function ($rootScope, $http) {
    window.pefConfig = null;
    window.pefTabs = null;
    window.pefSelectedTabIndex = 0;

    $http.get('configuration.json').success(function(data) {
      window.pefConfig = data;
      window.pefTabs = window.pefConfig.tabs;

      window.pefTabs.push({
        title: 'Confirm',
        name: 'confirm',
        templateUrl: 'confirm'
      });
    });
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'views/page.html',
      controller: 'PageCtrl'
    });
  });