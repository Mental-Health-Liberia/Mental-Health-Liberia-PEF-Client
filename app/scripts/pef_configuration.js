'use strict';

angular.module('pefApp').service('$config', function factory($http, $rootScope) {
  var configuration = null;
  var selectedTabIndex = 0;

  var getConfig = function (callback) {
    if (configuration !== null) {
      return callback(configuration);
    }

    $http.get('configuration.json').success(function(data) {
      configuration = data;
      return callback(data);
    });
  };

  var getTabs = function (callback) {
    getConfig(function (config) {
      return callback(config.tabs);
    });
  };

  var getSelectTab = function (index) {
    getTabs(function (tabs) {
      selectedTabIndex = index;
      $rootScope.$broadcast('selectedTabChanged', tabs[selectedTabIndex]);
    });
  };

  var nextTab = function() {
    getSelectTab(selectedTabIndex + 1);
  };

  var selectedTab = function (callback) {
    getTabs(function (tabs) {
      return callback(tabs[selectedTabIndex]);
    });
  };

  var getSelectedTabIndex = function () {
    return selectedTabIndex;
  };

  return {
    get: getConfig,
    tabs: getTabs,
    selectTab: getSelectTab,
    nextTab: nextTab,

    selectedTab: selectedTab,
    selectedTabIndex: getSelectedTabIndex
  };
});