'use strict';

angular.module('pefApp', ['ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/basic', {
        templateUrl: 'views/basic.html',
        controller: 'BasicCtrl'
      })
      .when('/demographics', {
        templateUrl: 'views/demographics.html',
        controller: 'DemographicsCtrl'
      })
      .when('/symptoms+functioning', {
        templateUrl: 'views/symptoms_functioning.html',
        controller: 'SymptomsFunctioningCtrl'
      })
      .when('/diagnosis', {
        templateUrl: 'views/diagnosis.html',
        controller: 'DiagnosisCtrl'
      })
      .when('/treatment', {
        templateUrl: 'views/treatment.html',
        controller: 'TreatmentCtrl'
      })
      .when('/discharge', {
        templateUrl: 'views/discharge.html',
        controller: 'DischargeCtrl'
      })
      .otherwise({
        redirectTo: '/basic'
      });
  });

var INTEGER_REGEXP = /^\-?\d*$/;
angular.module('pefApp').directive('integer', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if (INTEGER_REGEXP.test(viewValue)) {
          // it is valid
          ctrl.$setValidity('integer', true);
          return viewValue;
        } else {
          // it is invalid, return undefined (no model update)
          ctrl.$setValidity('integer', false);
          return undefined;
        }
      });
    }
  };
});
