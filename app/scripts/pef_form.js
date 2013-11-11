'use strict';

angular.module('pefApp').service('$form', function factory($http) {
  var getFormCount = function () {
    var formCount = parseInt(window.localStorage.formCount, 10);
    if (!formCount) {
      window.localStorage.formCount = 0;
      formCount = 0;
    }

    return formCount;
  };

  var incrementFormCount = function () {
    var formCount = getFormCount();

    window.localStorage.formCount = formCount + 1;
  };

  var getForms = function () {
    var formCount = getFormCount();

    var forms = [];
    for (var i = 0; i < formCount; i++) {
      forms.push(JSON.parse(window.localStorage['form-' + i]));
    }

    return forms;
  };

  var addForm = function (formData) {
    var formCount = getFormCount();

    window.localStorage['form-' + formCount] = JSON.stringify(formData);

    incrementFormCount();
  };

  var testServerAvailability = function (callback) {
    $http({method: 'GET', url: '/'})
      .success(function () {
        callback(true);
      }).error(function () {
        callback(false);
      });
  };

  return {
    get: getForms,
    add: addForm,
    serverAvailable: testServerAvailability
  };
});