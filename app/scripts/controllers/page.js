'use strict';

angular.module('pefApp')
  .controller('PageCtrl', function ($scope, $rootScope, $config) {

    $scope.$on('selectedTabChanged', function (event, selectedTab) {
      $scope.finalizeTabSelected = false;
      $scope.selectedTab = selectedTab;
    });

    $scope.$watch('selectedTab', function (newValue) {
      console.log(newValue);
    }, true);

    $scope.nextButtonClicked = function() {
      $config.nextTab();
    };
  });
