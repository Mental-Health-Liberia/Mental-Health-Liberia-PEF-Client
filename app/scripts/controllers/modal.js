'use strict';

angular.module('pefApp')
  .controller('ModalCtrl', function ($scope, $modalInstance, $sce, header, content, buttons) {
    $scope.header = header;
    $scope.content = $sce.trustAsHtml(content);
    $scope.buttons = buttons;

    $scope.buttonClicked = function (button) {
      $modalInstance.close(button);
    };
  });
