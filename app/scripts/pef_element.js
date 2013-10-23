'use strict';

angular.module('pefApp').directive('pefElement', function($compile) {
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

      switch (scope.type) {
      case 'select':
        // Initially set value to first option
        scope.value = scope.options[0];

        elm.prepend('<select ng-model="value" id="{{name}}" name="{{name}}" ng-options="option for option in options"></select>');
        break;
      case 'text':
        elm.prepend('<input type="text" ng-model="value" id="{{name}}" name="{{name}}" placeholder="{{placeholder}}">');
        break;
      case 'patient_id':
        elm.prepend('<div class="input-append"><input type="text" ng-model="value" id="{{name}}" name="{{name}}" placeholder="{{placeholder}}"><button class="btn">Generate</button></div>');
        break;
      case 'radio':
        elm.prepend('<label class="radio" ng-repeat="option in options"><input type="radio" ng-model="$parent.value" value="{{option.name}}"> {{option.title}} </label>');
        break;
      case 'datepicker':
        elm.prepend('<div class="well well-small pull-left"><datepicker ng-model="$parent.value" min="minDate" show-weeks="showWeeks" day-format="\'d\'"></timepicker></div>');
        break;
      case 'timepicker':
        elm.prepend('<div class="well well-small pull-left"><timepicker class="timepicker" ng-model="value" show-meridian="true"></timepicker></div>');
        break;
      }

      $compile(elm.contents())(scope);
    }
  };
});