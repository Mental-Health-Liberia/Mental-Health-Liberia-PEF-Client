'use strict';

angular.module('pefApp')
  .controller('NavbarCtrl', function ($scope, $rootScope, $config) {
    $scope.maxValidTabIndex = 0;

    $config.tabs(function (tabs) {
      $scope.tabs = tabs.map(function (tab) {
        return {
          title: tab.title,
          slug: tab.name,
          selected: (_.indexOf(tabs, tab) === $config.selectedTabIndex()),
          disabled: (_.indexOf(tabs, tab) > $scope.maxValidTabIndex)
        };
      });
    });

    $scope.$on('selectedTabChanged', function () {
      $scope.maxValidTabIndex = Math.max($scope.maxValidTabIndex, $config.selectedTabIndex());

      _.forEach($scope.tabs, function (tab) {
        tab.selected = (_.indexOf($scope.tabs, tab) === $config.selectedTabIndex());
        tab.disabled = (_.indexOf($scope.tabs, tab) > $scope.maxValidTabIndex);
      });
    });

    $scope.tabSelected = function (index) {
      $config.selectTab(index);
    };

    $config.selectTab(0);
  });