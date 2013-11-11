'use strict';

angular.module('pefApp')
  .controller('ModalCtrl', function ($scope, $modalInstance, $sce, header, content) {
    $scope.header = header;
    $scope.content = $sce.trustAsHtml(content);

    $scope.ok = function () {
      $modalInstance.close();
    };
  });
