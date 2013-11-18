'use strict';

angular.module('pefApp')
  .controller('PageCtrl', function ($scope, $rootScope, $config, $modal) {
    $rootScope.$on('tabsReady', function () {
      $config.selectTab(0);
    });

    $scope.$on('selectedTabChanged', function (event, selectedTab) {
      $config.tabs(function (tabs) {
        $scope.tabs = tabs;
      });

      $scope.selectedTab = selectedTab;

      $('html, body').animate({
        scrollTop: 0
      }, 200);
    });

    $scope.continueButtonClicked = function () {
      var invalidMessages = $config.tabInvalidMessages($config.selectedTab());

      if (invalidMessages.length > 0) {
        $config.showInvalidModal(invalidMessages);
        return;
      }

      $config.nextTab();
    };

    $scope.backButtonClicked = function () {
      $config.lastTab();
    };

    $scope.backButtonDisabled = function () {
      return $config.selectedTabIndex() === 0;
    };

    $scope.saveButtonClicked = function () {
      var modalInstance = $modal.open({
        templateUrl: 'views/modal.html',
        controller: 'ModalCtrl',
        resolve: {
          header: function() {
            return 'Save Form';
          },
          content: function() {
            return 'Once the form has been saved, it can no longer be edited. Are you sure you want to save the form?';
          },
          buttons: function() {
            return ['Save', 'Don\'t Save'];
          }
        }
      });

      modalInstance.result.then(function (result) {
        if (result === 'Save') {
          $config.submit(function () {
            $rootScope.$broadcast('reset');
            $config.selectTab(0);
          });
        }
      });
    };

    $scope.formatDate = function (value) {
      return moment(value).format('MMMM Do YYYY');
    };

    $scope.validate = $config.validate;
    
    $scope.generateButtonClicked = function () {
      var modalInstance = $modal.open({
        templateUrl: 'views/generate_modal.html',
        controller: 'GenerateModalCtrl',
        resolve: {
          header: function() {
            return 'Enter Patient Information';
          },
          content: function() {
            return '';
          }
        }
      });
    };
    
  });
