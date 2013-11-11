'use strict';

angular.module('pefApp')
  .controller('ModalCtrl', function ($scope, $modalInstance, header, content) {
    $scope.header = header;
    $scope.content = content;

    $scope.ok = function () {
      $modalInstance.close();
    };
});
