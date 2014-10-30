vinisketch.directive ('vsButton', function() {

  function setStyle (element, scope, newStyle) {
    if (newStyle) {
      if (scope.style) {
        element.removeClass (scope.style);
        scope.style = "";
      }
      
      switch (newStyle) {
        case "":
          newStyle = "white";
          break;
        case "black":
          break;
        case "green":
        case "red":
        case "grey":
        case "white":
          break;
        default:
          console.warn ("Unsuported button.style: " + newStyle);
          return;
      }
      scope.style = newStyle;
      element.addClass (scope.style);
    }
  }
  
  function setType (element, scope, newType) {

    if (newType) {
      if (scope.type) {
        element.removeClass (scope.type);
        scope.type = "";
      }
      
      switch (newType) {
        case "":
          newType = "default";
          break;
        case "nav":
        case "nav_back":
        case "nav_forward":
        case "default":
          break;
        default:
          console.warn ("Unsuported button.type: " + newType);
          return;
      }
      scope.type = newType;
      element.addClass (scope.type);
    }
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

      element.addClass ("vs_ui_button");
      
      if (attrs.type) {
        setType (element, scope, attrs.type);
      }
      else {
        element.addClass (scope.type);
      }
      if (attrs.style) {
        setStyle (element, scope, attrs.style);
      }
      else {
        element.addClass (scope.style);
      }

      scope.$watch ('style', function (newStyle) {
        setStyle (element, scope, newStyle);
      });
      
      scope.$watch ('type', function (newType) {
        setType (element, scope, newType);
      });
      
      element.on ('$destroy', function() {
        console.log ("vsButton $destroy");
      });
    }
  };
                      
});