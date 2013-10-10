'use strict';

angular.module('pefApp').directive('pefElement', function($compile) {
  return {
    restrict: 'E',
    scope: {
      name: '=name',
      type: '=type',
      options: '=options',
      model: '=ngModel',
      placeholder: '=placeholder'
    },
    link: function(scope, elm) {
      switch (scope.type) {
      case 'select':
        scope.model = scope.options[0];
        elm.append('<select ng-model="model" id="{{name}}" name="{{name}}" ng-options="option for option in options"></select>');
        $compile(elm.contents())(scope);
        break;
      case 'text':
        elm.append('<input type="text" ng-model="model" id="{{name}}" name="{{name}}" placeholder="{{placeholder}}">');
        $compile(elm.contents())(scope);
        break;
      case 'patient_id':
        elm.append('<div class="input-append"><input type="text" ng-model="model" id="{{name}}" name="{{name}}" placeholder="{{placeholder}}"><button class="btn">Generate</button></div>');
        $compile(elm.contents())(scope);
        break;
      case 'radio':
        elm.append('<label class="radio" ng-repeat="option in options"><input type="radio" ng-model="$parent.model" value="{{option.name}}"> {{option.title}} </label>');
        $compile(elm.contents())(scope);
        break;
      case 'datepicker':
        elm.append('<div class="well well-small pull-left"><datepicker ng-model="$parent.model" min="minDate" show-weeks="showWeeks" day-format="\'d\'"></timepicker></div>');
        $compile(elm.contents())(scope);
        break;
      case 'timepicker':
        elm.append('<div class="well well-small pull-left"><timepicker class="timepicker" ng-model="model" show-meridian="true"></timepicker></div>');
        $compile(elm.contents())(scope);
        break;
      }
    }
  };
});