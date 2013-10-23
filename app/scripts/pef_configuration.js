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
      var tabs = config.tabs;

      addConfirmAndFinalizeTabs(tabs);

      return callback(tabs);
    });
  };

  var selectTab = function (index) {
    getTabs(function (tabs) {
      selectedTabIndex = index;
      $rootScope.$broadcast('selectedTabChanged', tabs[selectedTabIndex]);
    });
  };

  var deselectTab = function () {
    selectedTabIndex = -1;
    $rootScope.$broadcast('selectedTabChanged', null);
  };

  var nextTab = function() {
    selectTab(selectedTabIndex + 1);
  };

  var selectedTab = function (callback) {
    getTabs(function (tabs) {
      return callback(tabs[selectedTabIndex]);
    });
  };

  var getSelectedTabIndex = function () {
    return selectedTabIndex;
  };

  var addConfirmAndFinalizeTabs = function (tabs) {
    tabs.push({
      title: 'Confirm',
      name: 'confirm',
      fieldsets: [
        {
          'title': 'Data'
        }
      ]
    });

    tabs.push({
      title: 'Finalize',
      name: 'finalize',
      fieldsets: [
        {
          'title': 'Finalize',
          'elements': [
            {
              'name': 'submit',
              'title': 'Submit',
              'type': 'button'
            }
          ]
        }
      ]
    });

    return tabs;
  };

  return {
    get: getConfig,
    tabs: getTabs,
    selectTab: selectTab,
    deselectTab: deselectTab,
    nextTab: nextTab,

    selectedTab: selectedTab,
    selectedTabIndex: getSelectedTabIndex
  };
});