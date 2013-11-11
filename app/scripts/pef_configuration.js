'use strict';

angular.module('pefApp').service('$config', function factory($http, $rootScope, $form) {
  var getConfig = function (callback) {
    if (window.pefConfig !== null) {
      return callback(window.pefConfig);
    }
  };

  var getTabs = function (callback) {
    if (window.pefTabs !== null) {
      return callback(window.pefTabs);
    }
  };

  var selectTab = function (index) {
    getTabs(function (tabs) {
      window.pefSelectedTabIndex = index;
      $rootScope.$broadcast('selectedTabChanged', tabs[window.pefSelectedTabIndex]);
    });
  };

  var deselectTab = function () {
    window.pefSelectedTabIndex = -1;
    $rootScope.$broadcast('selectedTabChanged', null);
  };

  var nextTab = function() {
    selectTab(window.pefSelectedTabIndex + 1);
  };

  var selectedTab = function (callback) {
    getTabs(function (tabs) {
      return callback(tabs[window.pefSelectedTabIndex]);
    });
  };

  var getSelectedTabIndex = function () {
    return window.pefSelectedTabIndex;
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
      window.pefConfig = data;
      window.pefTabs = window.pefConfig.tabs;

      window.pefTabs.push({
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

    selectedTab: selectedTab,
    selectedTabIndex: getSelectedTabIndex,

    submit: submit
  };
});