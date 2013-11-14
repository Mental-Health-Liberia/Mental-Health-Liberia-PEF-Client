'use strict';

angular.module('pefApp')
  .controller('PageCtrl', function ($scope, $rootScope, $config, $modal) {
    var FIELDSET_VALIDATE_TESTS = {
      'one_required': {
        test: function (models) {
          return models.some(function (model) {
            return model !== undefined && model !== null && model.length > 0;
          });
        },
        message: 'must have at least one completed field'
      }
    };

    var ELEMENT_VALIDATE_TESTS = {
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

    $rootScope.$on('tabsReady', function () {
      $config.selectTab(0);
    });

    $scope.$on('selectedTabChanged', function (event, selectedTab) {
      $config.tabs(function (tabs) {
        $scope.tabs = tabs;
      });

      $scope.selectedTab = selectedTab;

      $('html, body').animate({
        scrollTop: 0
      }, 200);
    });

    $scope.continueButtonClicked = function () {
      var invalidMessages = [];

      for (var f in $scope.selectedTab.fieldsets) {
        var fieldset = $scope.selectedTab.fieldsets[f];
        var fieldsetInvalidMessages = $scope.validateFieldset(fieldset, true);
        invalidMessages = invalidMessages.concat(fieldsetInvalidMessages);
      }

      document.getElementById('continueButton').blur();
      document.getElementById('backButton').blur();

      if (invalidMessages.length === 0) {
        $config.nextTab();
      } else {
        $modal.open({
          templateUrl: 'views/modal.html',
          controller: 'ModalCtrl',
          resolve: {
            header: function() {
              return null;
            },
            content: function() {
              return ['<p><strong>Please fix the following errors before continuing:</strong></p>',
              '<ul>',
              '<li>',
              invalidMessages.join('</li><li>'),
              '</li>',
              '</ul>'].join('');
            },
            buttons: function() {
              return ['OK'];
            }
          }
        });
      }
    };

    $scope.backButtonClicked = function () {
      $config.lastTab();
    };

    $scope.backButtonDisabled = function () {
      return $config.selectedTabIndex() === 0;
    };

    $scope.saveButtonClicked = function () {
      var modalInstance = $modal.open({
        templateUrl: 'views/modal.html',
        controller: 'ModalCtrl',
        resolve: {
          header: function() {
            return 'Save Form';
          },
          content: function() {
            return 'Once the form has been saved, it can no longer be edited. Are you sure you want to save the form?';
          },
          buttons: function() {
            return ['Save', 'Don\'t Save'];
          }
        }
      });

      modalInstance.result.then(function (result) {
        if (result === 'Save') {
          $config.submit(function () {
            $rootScope.$broadcast('reset');
            $config.selectTab(0);
          });
        }
      });
    };

    $scope.validateFieldset = function (fieldset, strict) {
      function mapFieldsetToElementValues(element) {
        return element.value;
      }

      var invalidMessages = [];

      for (var e in fieldset.elements) {
        var element = fieldset.elements[e];

        if (!$scope.validate(element, strict)) {
          invalidMessages.push(element.title + ' ' + element.invalidMessage + '.');
        }
      }

      if (strict) {
        if (fieldset.rules) {
          for (var rule in fieldset.rules) {
            var test = FIELDSET_VALIDATE_TESTS[rule];

            if (test) {
              var values = fieldset.elements.map(mapFieldsetToElementValues);
              var result = test.test(values);

              if (!result) {
                invalidMessages.push(fieldset.title + ' ' + test.message + '.');
              }
            }
          }
        }
      }

      return invalidMessages;
    };

    $scope.validate = function (element, strict) {
      var value = element.value;

      if (strict || (value !== undefined && value.length > 0)) {
        if (element.rules) {
          for (var rule in element.rules) {
            var test = ELEMENT_VALIDATE_TESTS[rule];

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

    $scope.formatDate = function (value) {
      return moment(value).format('MMMM Do YYYY');
    };
  });
