'use strict';

angular.module('pefApp').directive('pefElement', function($compile, $modal) {
  var TYPE_MAP = {
    'select': {
      init: function (scope) {
        if (scope.options) {
          scope.value = scope.value || scope.options[0];
        }
      },
      template: '<select ng-model="value" id="{{name}}" name="{{name}}" ng-options="option for option in options"></select>',
    },
    'text': {
      template: '<input type="text" ng-model="value" id="{{name}}" name="{{name}}" placeholder="{{placeholder}}">',
    },
    'patient_id': {
      init: function (scope) {
        scope.generateButtonClicked = function () {
          var modalInstance = $modal.open({
            templateUrl: 'views/generate_modal.html',
            controller: 'GenerateModalCtrl',
            resolve: {
              header: function() {
                return 'Generate Patient ID';
              },
              content: function() {
                return '';
              }
            }
          });

          modalInstance.result.then(function (result) {
            if (result !== 'Cancel') {
              scope.value = result.toString();
            }
          });
        };

        scope.resetButtonClicked = function () {
          this.value = null;
        };
      },
      template: '<button class="btn" ng-click="generateButtonClicked()" ng-bind="value ? \'Generated\' : \'Generate\'" ng-disabled="value" ng-class="{\'btn-success\': value}"></button> <button class="btn" ng-click="resetButtonClicked()" ng-show="value">Reset</button>',
    },
    'radio': {
      init: function (scope) {
        if (scope.options) {
          scope.value = scope.value || scope.options[0];
        }
      },
      template: '<label class="radio" ng-repeat="option in options"><input type="radio" ng-model="$parent.value" value="{{option}}"> {{option}} </label>',
    },
    'checkbox': {
      init: function (scope) {
        scope.value = scope.value || [];

        scope.isChecked = function (option) {
          return _.indexOf(scope.value, option) !== -1;
        };

        scope.check = function (option) {
          if (!scope.isChecked(option)) {
            scope.value.push(option);
          } else {
            _.pull(scope.value, option);
          }
        };
      },
      template: '<label class="checkbox" ng-repeat="option in options"><input type="checkbox" name="{{name}}[]" ng-checked="isChecked(option)" ng-click="check(option)"> {{option}} </label>',
    },
    'datepicker': {
      init: function (scope) {
        scope.maxDate = Date.now();
        scope.value = scope.value || Date.now();
      },
      template: '<div class="well well-small pull-left"><datepicker class="datepicker" ng-model="value" max="maxDate" show-weeks="showWeeks" day-format="\'d\'"></timepicker></div>',
    },
    'timepicker': {
      init: function (scope) {
        scope.value = scope.value || Date.now();
      },
      template: '<div class="well well-small pull-left" ng-model="value"><timepicker class="timepicker" show-meridian="true"></timepicker></div>'
    }
  };

  return {
    restrict: 'E',
    scope: {
      name: '=name',
      type: '=type',
      options: '=options',
      value: '=value',
      placeholder: '=placeholder',
      help: '=help',
      rules: '=rules',
      valid: '=valid',
      validate: '=validate',
      invalidMessage: '=invalidMessage'
    },
    link: function(scope, elm) {
      scope.valid = true;

      scope.$watch('value', function () {
        scope.validate(scope);
      });

      if (_.has(TYPE_MAP, scope.type)) {
        if (TYPE_MAP[scope.type].init !== undefined) {
          TYPE_MAP[scope.type].init(scope);
        }

        elm.prepend(TYPE_MAP[scope.type].template);
        elm.append('<span class="help-inline" ng-show="help && valid"><span class="text-warning">{{help}}</span></span>');
        elm.append('<span class="help-inline" ng-show="!valid">This field {{invalidMessage}}.</span>');
      }

      $compile(elm.contents())(scope);
    }
  };
});