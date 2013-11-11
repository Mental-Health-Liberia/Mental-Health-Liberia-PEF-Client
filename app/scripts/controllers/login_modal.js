'use strict';

angular.module('pefApp')
  .controller('LoginModalCtrl', function ($scope, $modalInstance, header, content, formsToUpload) {
    $scope.header = header;
    $scope.content = content;
    $scope.formsToUpload = formsToUpload;

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
