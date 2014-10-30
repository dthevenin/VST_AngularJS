vinisketch.directive ('vsSplitView', function() {
  

  function setOrientation (scope, element, newOrient, currentOrient) {

    element.removeClass ('horizontal');
    element.removeClass ('vertical');

    switch (newOrient) {
      case undefined:
      case null:
      case "":
        scope.orientation = "horizontal";
        return;
      case "horizontal":
      case "vertical":
        break;
      default:
        console.warn ("Unsuported SplitView.orientation: " + newOrient);
        return;
    }

    element.addClass (newOrient);
  }

  function setMode (scope, element, newMode, currentMode) {

    element.removeClass ('tablet');
    element.removeClass ('phone');

    switch (newMode) {
      case undefined:
      case null:
      case "":
        scope.mode = "tablet";
        return;
      case "tablet":
      case "phone":
        break;
      default:
        console.warn ("Unsuported SplitView.mode: " + newMode);
        return;
    }

    element.addClass (newMode);
  }

  return {
    restrict: 'E',
    
    transclude: true,
    
    scope: {
      mode: "@",
      orientation: "@"
    },

    controller: function ($scope) {
      $scope.mode = "tablet";
      $scope.orientation = "vertical";
    },
    
    link: function (scope, element, attrs, controller, transclude) {

      element.addClass ("vs_ui_splitview");
      setMode (scope, element, scope.mode);
      setOrientation (scope, element, scope.orientation);

      var view_node = element[0];
      var main_panel_node;
      var secondary_panel_node;

      transclude (scope, function (cloned) {
        
        for (var i = 0, l = cloned.length; i < l; i++) {
          var item = cloned [i];
          if (item.tagName == 'VS-MAIN-PANEL') {
            main_panel_node = item;
            item.classList.add ("main_panel");
          }
          else if (item.tagName == 'VS-SECONDARY-PANEL') {
            secondary_panel_node = item;
            item.classList.add ("secondary_panel");
          }
        }
        view_node.appendChild (secondary_panel_node);
        view_node.appendChild (main_panel_node);
      });

      scope.$watch ('orientation', function (newOrientation, currentOrientation) {
        if (angular.isUndefined (newOrientation)) {
          return;
        }
        setOrientation (scope, element, newOrientation, currentOrientation);
      });
      
      scope.$watch ('mode', function (newMode, currentMode) {
        if (angular.isUndefined (newMode)) {
          return;
        }
        setMode (scope, element, newMode, currentMode);
      });
      
      element.on ('$destroy', function() {
        console.log ("vsButton $destroy");
      });
    }
  };                 
});