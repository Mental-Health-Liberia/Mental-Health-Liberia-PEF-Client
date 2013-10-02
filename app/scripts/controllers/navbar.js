'use strict';

angular.module('pefApp')
  .controller('NavbarCtrl', function ($scope, $location, $config) {
    $config.tabs(function (tabs) {
      $scope.tabs = tabs.map(function (tab) {
        return {
          title: tab.title,
          slug: tab.name,
          selected: ($config.selectedTabIndex() == _.indexOf(tabs, tab))
        };
      });
    });
    
    $scope.$on('selectedTabChanged', function(event, selectedTab) {
    	_.forEach($scope.tabs, function (tab) {
    		tab.selected = ($config.selectedTabIndex() == _.indexOf($scope.tabs, tab));
    	});
    });
    
    $scope.tabSelected = function (index) {
      $config.selectTab(index);
    }
  });