'use strict';

angular.module('pefApp')
  .controller('LoginModalCtrl', function ($scope, $modalInstance, header, content) {
    $scope.header = header;
    $scope.content = content;

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
});
