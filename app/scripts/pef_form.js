'use strict';

angular.module('pefApp').service('$form', function factory($http, $rootScope) {
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

  var decrementFormCount = function () {
    var formCount = getFormCount();

    window.localStorage.formCount = formCount - 1;
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

    $rootScope.$broadcast('formsUpdated');
  };

  var deleteFormAtIndex = function (index) {
    var formCount = getFormCount();

    if (index >= formCount || index < 0) {
      return;
    }

    for (var i = index; i <= formCount - 2; i++) {
      window.localStorage['form-' + i] = window.localStorage['form-' + (i + 1)];
    }

    decrementFormCount();

    $rootScope.$broadcast('formsUpdated');
  };

  var testServerAvailability = function (callback) {
    $http({method: 'GET', url: '/'})
      .success(function () {
        callback(true);
      }).error(function () {
        callback(false);
      });
  };

  var uploadForm = function (formWithIndex, callback) {
    $http({
      method: 'POST',
      url: '/forms.json',
      data: formWithIndex.form
    }).success(function () {
      deleteFormAtIndex(formWithIndex.index);
      callback();
    }).error(function (data) {
      callback(data);
    });
  };

  var uploadAllForms = function (callback) {
    var forms = getForms();

    for (var i = 0; i < forms.length; i++) {
      forms[i] = {
        index: i,
        form: forms[i]
      };
    }

    forms.reverse();

    async.eachSeries(forms, uploadForm, function (err) {
      if (err) {
        console.error(err);
        callback(false);
      } else {
        callback(true);
      }
    });
  };

  return {
    get: getForms,
    add: addForm,
    serverAvailable: testServerAvailability,
    uploadAllForms: uploadAllForms
  };
});