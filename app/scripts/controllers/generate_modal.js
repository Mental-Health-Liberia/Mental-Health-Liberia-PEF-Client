'use strict';

angular.module('pefApp')
  .controller('GenerateModalCtrl', function ($scope, $modalInstance, header) {
    var MONTH_PLACEHOLDER = 'Month';
    var DAY_PLACEHOLDER = 'Day';
    var YEAR_PLACEHOLDER = 'Year';

    $scope.header = header;

    $scope.firstName = "";
    $scope.lastName = "";

    $scope.month = MONTH_PLACEHOLDER;
    $scope.day = DAY_PLACEHOLDER;
    $scope.year = YEAR_PLACEHOLDER;
    
    $scope.hash = function() {
      var hashElements = [];
      hashElements = [];

      hashElements.push($scope.firstName.replace(/[^A-Za-z]/g, '').toUpperCase());
      hashElements.push($scope.lastName.replace(/[^A-Za-z]/g, '').toUpperCase());

      if (!$scope.unknownBirthdate) {
        hashElements.push($scope.month, $scope.day, $scope.year);
      }

      return hashElements.join('').split('').reduce(function(hash, string) {
        hash = ((hash << 5) - hash) + string.charCodeAt(0);
        return hash & hash; // Convert to 32bit integer
      }, 0);
    };

    $scope.generate = function () {
      if ($scope.valid()) {
        $modalInstance.close($scope.hash());
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('Cancel');
    };

    $scope.valid = function () {
      if (!$scope.unknownBirthdate) {
        if ($scope.month === MONTH_PLACEHOLDER || $scope.day === DAY_PLACEHOLDER || $scope.year === YEAR_PLACEHOLDER) {
          return false;
        }
      }

      if ($scope.firstName.replace(/[^A-Za-z]/g, '').length === 0 || $scope.lastName.replace(/[^A-Za-z]/g, '').length === 0) {
        return false;
      }

      return true;
    };

    $scope.months = function() {
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      if ($scope.month === MONTH_PLACEHOLDER) {
        months.unshift(MONTH_PLACEHOLDER);
      }

      return months;
    }

    $scope.days = function () {
      var days = [];
      var daysInMonth;

      if ('February' === $scope.month) {
        daysInMonth = 29;
      } else if (_.contains(['January', 'March', 'May', 'July', 'August', 'October', 'December'], $scope.month)) {
        daysInMonth = 31;
      } else {
        daysInMonth = 30;
      }

      for (var i = 1; i <= daysInMonth; i++) {
        days.push(i);
      }

      if ($scope.day === DAY_PLACEHOLDER) {
        days.unshift(DAY_PLACEHOLDER);
      }

      return days;
    };

    $scope.years = function () {
      var years = [];
      var yearsToGoBack = 130;
      var currentYear = moment().year();

      for (var year = currentYear; year >= currentYear - yearsToGoBack; year--) {
        years.push(year);
      }

      if ($scope.year === YEAR_PLACEHOLDER) {
        years.unshift(YEAR_PLACEHOLDER);
      }

      return years;
    };
  });
