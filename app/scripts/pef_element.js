'use strict';

angular.module('pefApp').directive('pefElement', function($compile) {
  var TYPE_TO_MARKUP = {
    'select': '<select ng-model="value" id="{{name}}" name="{{name}}" ng-options="option for option in options"></select>',
    'text': '<input type="text" ng-model="value" id="{{name}}" name="{{name}}" placeholder="{{placeholder}}">',
    'patient_id': '<div class="input-append"><input type="text" ng-model="value" id="{{name}}" name="{{name}}" placeholder="{{placeholder}}"><button class="btn">Generate</button></div>',
    'radio': '<label class="radio" ng-repeat="option in options"><input type="radio" ng-model="$parent.value" value="{{option}}"> {{option}} </label>',
    'datepicker': '<div class="well well-small pull-left"><datepicker ng-model="$parent.value" min="minDate" show-weeks="showWeeks" day-format="\'d\'"></timepicker></div>',
    'timepicker': '<div class="well well-small pull-left"><timepicker class="timepicker" ng-model="value" show-meridian="true"></timepicker></div>'
  };

  return {
    restrict: 'E',
    scope: {
      name: '=name',
      type: '=type',
      options: '=options',
      value: '=value',
      placeholder: '=placeholder',
      rules: '=rules',
      valid: '=valid',
      invalidMessage: '=invalidMessage',
      validate: '=validate'
    },
    link: function(scope, elm) {
      scope.valid = true;

      scope.$watch('value', function () {
        scope.validate(scope);
      });

      if (_.has(TYPE_TO_MARKUP, scope.type)) {
        elm.prepend(TYPE_TO_MARKUP[scope.type]);
      }

      if (scope.options) {
        scope.value = scope.options[0];
      }

      $compile(elm.contents())(scope);
    }
  };
});