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
      return callback(config["tabs"]);
    });
  };

  return {
    get: getConfig,
    tabs: getTabs,
    selectTab: function (index) {
      getTabs(function (tabs) {
        selectedTabIndex = index;
        $rootScope.$broadcast('selectedTabChanged', tabs[selectedTabIndex]);
      });
    },
    selectedTab: function (callback) {
      getTabs(function (tabs) {
        return callback(tabs[selectedTabIndex]);
      });
    },
    selectedTabIndex: selectedTabIndex
  }
});