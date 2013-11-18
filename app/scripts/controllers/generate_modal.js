'use strict';

angular.module('pefApp')
  .controller('GenerateModalCtrl', function ($scope, $http, $modalInstance, $form, header) {
    $scope.header = header;

    $scope.$watch('firstName', function () {
      $scope.failureMessage = null;
      $scope.getElementById("firstName").placeholder="first";
    });

    $scope.$watch('lastName', function () {
      $scope.failureMessage = null;
    });

    $scope.$watch('birthdate', function () {
      $scope.failureMessage = null;
    });
    
    $scope.createHash = function() {
      $scope.firstName.replace(/\W/g, '').toUpperCase();
      $scope.lastName.replace(/\W/g, '').toUpperCase();
      $scope.birthdate.replace(/\W/g, '').toUpperCase();
      $scope.patientID = ("" + $scope.firstName + $scope.lastName + $scope.birthdate).split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);;
    };
    
    function log(msg) {///////////////////
      setTimeout(function() {
          throw new Error(msg);
      }, 0);
    };
    
    $scope.generate = function () {
     /* $http({
        method: 'POST',
        url: '/users/sign_in.json',
        data: {
          user: {*/
            firstName: $scope.firstName;
            lastName: $scope.lastName;
            birthdate: $scope.birthdate;
            log($scope.firstName);
            log($scope.lastName);
            log($scope.birthdate);

     /*     }
        }
}).success(function (data) {
          if (!data.success) {
            if (data.errors && data.errors.length > 0) {
              $scope.failureMessage = data.errors.join(' ');
            } else {
              $scope.failureMessage = 'Something went wrong. Please try again later.';
            }
          } else {*/
          //if ($scope.firstName != null && $scope.lastName != null && $scope.birthdate != null) {
              $modalInstance.close();
          //}
          /*}
        }).error(function (data) {
          $scope.failureMessage = data;
        });*/
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
