'use strict';

angular.module('pefApp').directive('pefElement', function($compile) {
  return {
    restrict: 'E',
    scope: {
      name: '=name',
      type: '=type',
      options: '=options',
      model: '=ngModel',
      placeholder: '=placeholder',
      validate: '=validate'
    },
    link: function(scope, elm) {
      function addValidateAttributes(compiledElement) {
        if (scope.validate && scope.validate.integer === true) {
          compiledElement.attr('integer', '');
        }
      }

      switch (scope.type) {
      case 'select':
        // Initially set model to first option
        scope.model = scope.options[0];
        elm.append('<select ng-model="model" id="{{name}}" name="{{name}}" ng-options="option for option in options"></select>');
        break;
      case 'text':
        elm.append('<input type="text" ng-model="model" id="{{name}}" name="{{name}}" placeholder="{{placeholder}}">');
        break;
      case 'patient_id':
        elm.append('<div class="input-append"><input type="text" ng-model="model" id="{{name}}" name="{{name}}" placeholder="{{placeholder}}"><button class="btn">Generate</button></div>');
        break;
      case 'radio':
        elm.append('<label class="radio" ng-repeat="option in options"><input type="radio" ng-model="$parent.model" value="{{option.name}}"> {{option.title}} </label>');
        break;
      case 'datepicker':
        elm.append('<div class="well well-small pull-left"><datepicker ng-model="$parent.model" min="minDate" show-weeks="showWeeks" day-format="\'d\'"></timepicker></div>');
        break;
      case 'timepicker':
        elm.append('<div class="well well-small pull-left"><timepicker class="timepicker" ng-model="model" show-meridian="true"></timepicker></div>');
        break;
      }

      addValidateAttributes($compile(elm.contents())(scope));
    }
  };
});