'use strict';

var ToolBarApp = angular.module('ToolBarApp', [
  'ngRoute',
  'vinisketch',
  'ngAnimate'
]);

ToolBarApp.controller ('AppController', function ($scope) {
  $scope.panels = [{
      name: "Buttons",
      href: "#/",
    }, {
      name: "Sliders",
      href: "#/slidersPanel",
    }, {
      name: "Switches",
      href: "#/switchPanel",
    }
  ]
});

ToolBarApp.config (['$routeProvider',
  function ($routeProvider) {
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