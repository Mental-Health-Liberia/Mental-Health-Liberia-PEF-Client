'use strict';

angular.module('pefApp').service('$config', function factory($http, $rootScope) {
  var configuration = null;
  var tabs = null;
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
    if (tabs !== null) {
      return callback(tabs);
    }

    getConfig(function (config) {
      tabs = config.tabs;
      addConfirmTab(tabs);
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

  var addConfirmTab = function (tabs) {
    tabs.push({
      title: 'Confirm',
      name: 'confirm',
      templateUrl: 'confirm'
    });

    return tabs;
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
    // TODO
    formKeyValuePairs(function (pairs) {
      console.log('Attempting to submit:', pairs);
    });

    callback();
  };

  $rootScope.$on('reset', function () {
    configuration = null;
    tabs = null;
  });

  return {
    get: getConfig,
    tabs: getTabs,
    selectTab: selectTab,
    deselectTab: deselectTab,
    nextTab: nextTab,

    selectedTab: selectedTab,
    selectedTabIndex: getSelectedTabIndex,

    submit: submit
  };
});