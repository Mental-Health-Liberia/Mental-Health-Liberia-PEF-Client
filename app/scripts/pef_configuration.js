'use strict';

angular.module('pefApp').service('$config', function factory($http, $rootScope, $form) {
  var config = null;
  var tabs = null;
  var selectedTabIndex = 0;

  $http.get('configuration.json').success(function(data) {
    config = data;
    tabs = config.tabs;

    tabs.push({
      title: 'Confirm',
      name: 'confirm',
      templateUrl: 'confirm'
    });

    $rootScope.$broadcast('tabsReady');
  });

  var getConfig = function (callback) {
    if (config !== null) {
      return callback(config);
    }
  };

  var getTabs = function (callback) {
    if (tabs !== null) {
      return callback(tabs);
    }
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

  var lastTab = function() {
    selectTab(selectedTabIndex - 1);
  };

  var selectedTab = function (callback) {
    getTabs(function (tabs) {
      return callback(tabs[selectedTabIndex]);
    });
  };

  var getSelectedTabIndex = function () {
    return selectedTabIndex;
  };

  var formKeyValuePairs = function (callback) {
    var pairs = {};

    getTabs(function (tabs) {
      for (var t in tabs) {
        var tab = tabs[t];

        for (var f in tab.fieldsets) {
          var fieldset = tab.fieldsets[f];

          for (var e in fieldset.elements) {
            var element = fieldset.elements[e];

            pairs[element.name] = element.value;
          }
        }
      }

      callback(pairs);
    });
  };

  var submit = function (callback) {
    formKeyValuePairs(function (pairs) {
      $form.add(pairs);
    });

    callback();
  };

  $rootScope.$on('reset', function () {
    $http.get('configuration.json').success(function(data) {
      config = data;
      tabs = config.tabs;

      tabs.push({
        title: 'Confirm',
        name: 'confirm',
        templateUrl: 'confirm'
      });

      selectTab(0);
    });
  });

  return {
    get: getConfig,
    tabs: getTabs,
    selectTab: selectTab,
    deselectTab: deselectTab,
    nextTab: nextTab,
    lastTab: lastTab,

    selectedTab: selectedTab,
    selectedTabIndex: getSelectedTabIndex,

    submit: submit
  };
});