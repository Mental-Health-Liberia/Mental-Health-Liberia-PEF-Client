'use strict';

angular.module('pefApp')
  .controller('NavbarCtrl', function ($scope, $rootScope, $config, $form, $modal) {
    $scope.maxValidTabIndex = 0;

    $scope.documents = $form.get();

    $rootScope.$on('tabsReady', function () {
      $config.tabs(function (tabs) {
        $scope.tabs = tabs.map(function (tab) {
          return {
            title: tab.title,
            slug: tab.name,
            selected: (_.indexOf(tabs, tab) === $config.selectedTabIndex()),
            disabled: (_.indexOf(tabs, tab) > $scope.maxValidTabIndex)
          };
        });
      });
    });

    $scope.$on('formsUpdated', function () {
      $scope.documents = $form.get();
    });

    $scope.$on('selectedTabChanged', function () {
      $scope.maxValidTabIndex = Math.max($scope.maxValidTabIndex, $config.selectedTabIndex());

      _.forEach($scope.tabs, function (tab) {
        tab.selected = (_.indexOf($scope.tabs, tab) === $config.selectedTabIndex());
        tab.disabled = (_.indexOf($scope.tabs, tab) > $scope.maxValidTabIndex);
      });
    });

    $rootScope.$on('reset', function () {
      $scope.maxValidTabIndex = 0;
    });

    $scope.tabSelected = function (index) {
      if (index > $config.selectedTabIndex()) {
        var invalidMessages = $config.tabInvalidMessages($config.selectedTab());

        if (invalidMessages.length > 0) {
          $config.showInvalidModal(invalidMessages);
          return;
        }
      }

      $config.selectTab(index);
    };

    $scope.uploadForms = function () {
      $form.serverAvailable(function (available) {
        var modalInstance;
        if (available) {
          modalInstance = $modal.open({
            templateUrl: 'views/login_modal.html',
            controller: 'LoginModalCtrl',
            resolve: {
              header: function() {
                return 'Log In to Upload Forms';
              },
              content: function() {
                return '';
              },
              formsToUpload: function() {
                return $scope.documents.length;
              }
            }
          });
        } else {
          modalInstance = $modal.open({
            templateUrl: 'views/modal.html',
            controller: 'ModalCtrl',
            resolve: {
              header: function() {
                return 'Upload Forms';
              },
              content: function() {
                return 'Please connect to the internet to upload the forms.';
              },
              buttons: function() {
                return ['OK'];
              }
            }
          });
        }
      });
    };

    $config.selectTab(0);
  });
