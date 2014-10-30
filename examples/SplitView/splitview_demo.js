'use strict';

var splitViewApp = angular.module('SplitViewApp', [
  'ngRoute',
  'vinisketch'
]);

splitViewApp.controller ('AppController', function ($scope) {
  $scope.panels = [
    {
      name: "Buttons",
      href: "#/",
    },
    {
      name: "Sliders",
      href: "#/slidersPanel",
    },
    {
      name: "Switches",
      href: "#/switchPanel",
    }
  ]
});

splitViewApp.config (['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/slidersPanel', {
        templateUrl: 'partials/slidersPanel.html'
      })
      .when('/switchPanel', {
        templateUrl: 'partials/switchPanel.html'
      })
      .otherwise ({
        templateUrl: 'partials/buttonsPanels.html'
      });
}])