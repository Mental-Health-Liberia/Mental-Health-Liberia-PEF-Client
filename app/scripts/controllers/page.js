'use strict';

angular.module('pefApp')
  .controller('PageCtrl', function ($scope, $rootScope, $config) {
    var VALIDATE_TESTS = {
      'number': {
        test: function (model) {
          return (model === undefined) || /^[0-9]*$/.test(model);
        },
        message: 'should be a number'
      },
      'required': {
        test: function (model) {
          return (model !== undefined) && (model !== null) && model.trim().length !== 0;
        },
        message: 'is required'
      }
    };

    $scope.$on('selectedTabChanged', function (event, selectedTab) {
      $scope.finalizeTabSelected = false;
      $scope.selectedTab = selectedTab;
    });

    $scope.nextButtonClicked = function () {
      var tabValid = true;
      var tabInvalidMessages = [];

      for (var f in $scope.selectedTab.fieldsets) {
        var fieldset = $scope.selectedTab.fieldsets[f];

        for (var e in fieldset.elements) {
          var element = fieldset.elements[e];

          if (!$scope.validate(element, true)) {
            tabInvalidMessages.push(element.title + ' ' + element.invalidMessage + '.');

            tabValid = false;
          }
        }
      }

      if (tabValid) {
        $config.nextTab();

        $config.tabs(function (tabs) {
          $scope.tabs = tabs;
        });
      } else {
        window.alert(tabInvalidMessages.join('\n'));
      }
    };

    $scope.submitButtonClicked = function () {
      console.log("TO BE IMPLEMENTED");
    };

    $scope.validate = function (element, strict) {
      var value = element.value;

      if (strict || value !== undefined) {
        if (element.rules) {
          for (var rule in element.rules) {
            var test = VALIDATE_TESTS[rule];

            if (test) {
              var result = test.test(value);

              if (!result) {
                element.valid = false;
                element.invalidMessage = test.message;

                return false;
              }
            }
          }
        }
      }

      element.valid = true;
      element.invalidMessage = null;

      return true;
    };
  });
