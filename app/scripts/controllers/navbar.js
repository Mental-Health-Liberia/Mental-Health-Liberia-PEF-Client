'use strict';

angular.module('pefApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.tabs = [
      {
        title: "Basic Information",
        slug: "basic"
      },
      {
        title: "Patient Demographics",
        slug: "demographics"
      },
      {
        title: "Symptoms and Functioning",
        slug: "symptoms+functioning"
      },
      {
        title: "Diagnosis",
        slug: "diagnosis"
      },
      {
        title: "Treatment",
        slug: "treatment"
      },
      {
        title: "Discharge",
        slug: "discharge"
      }
    ];

    for (var i = 0; i < $scope.tabs.length; i++) {
      if ($location.path().replace(/^\//g, '') === $scope.tabs[i].slug) {
        $scope.tabs[i].active = true;
      }
    }

    $scope.tabSelected = function (tab) {
      $scope.selectedTab = tab;
      $location.path(tab.slug);
    }
  });