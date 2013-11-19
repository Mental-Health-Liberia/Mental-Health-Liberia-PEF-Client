'use strict';

angular.module('pefApp')
  .controller('LoginModalCtrl', function ($scope, $http, $modalInstance, $form, header, formsToUpload) {
    $scope.header = header;
    $scope.formsToUpload = formsToUpload;

    $scope.$watch('username', function () {
      $scope.failureMessage = null;
    });

    $scope.$watch('password', function () {
      $scope.failureMessage = null;
    });

    $scope.ok = function () {
      if ($scope.username && $scope.password) {
        $http({
          method: 'POST',
          url: '/users/sign_in.json',
          data: {
            user: {
              username: $scope.username,
              password: $scope.password
            }
          }
        }).success(function (data) {
            if (!data.success) {
              if (data.errors && data.errors.length > 0) {
                $scope.failureMessage = data.errors.join(' ');
              } else {
                $scope.failureMessage = 'Something went wrong. Please try again later.';
              }
            } else {
              $form.uploadAllForms(function () {
                $modalInstance.close();
              });
            }
          }).error(function (data) {
            $scope.failureMessage = data;
          });
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('Cancel');
    };
  });
