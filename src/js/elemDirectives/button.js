vinisketch.directive ('vsButton', function() {

  function containsStyle (elem) {
    if (elem.classList.contains ("white") ||
        elem.classList.contains ("green") ||
        elem.classList.contains ("black") ||
        elem.classList.contains ("red") ||
        elem.classList.contains ("grey")) {
      return true;
    }
    return false;
  }

  function containsType (elem) {
    if (elem.classList.contains ("default") ||
        elem.classList.contains ("nav") ||
        elem.classList.contains ("nav_back") ||
        elem.classList.contains ("nav_forward")) {
      return true;
    }
    return false;
  }

  return {
    restrict: 'E',
    
    transclude: true,
    
    scope: {
      type: "@",
      style: "@",
    },

    controller: function ($scope) {
      $scope.value = "";
      $scope.type = "default";
      $scope.style = "white";
    },
    
    template : "<div ng-transclude>{{value}}</div>",
  
    link: function (scope, element, attrs, controller, transclude) {

      var elem = element [0];
      if (!containsType (element [0])) {
        element.addClass ("default");
      }
      if (!containsStyle (element [0])) {
        element.addClass ("white");
      }
      element.addClass ("vs_ui_button");

      element.on ('$destroy', function() {
        console.log ("vsButton $destroy");
      });
    }
  };
                      
});