vinisketch.directive ('vsSplitView', function() {
  

  function setOrientation (element, newOrient, currentOrient) {

    element.removeClass (currentOrient);

    switch (newOrient) {
      case undefined:
      case null:
      case "":
        newOrient = "horizontal";
        break;
      case "horizontal":
      case "vertical":
        break;
      default:
        console.warn ("Unsuported SplitView.orientation: " + newOrient);
        return;
    }
    element.addClass (newOrient);
  }

  function setMode (element, newMode, currentMode) {

    element.removeClass (currentMode);

    switch (newMode) {
      case undefined:
      case null:
      case "":
        newMode = "tablet";
        break;
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
      element.addClass (scope.mode);
      element.addClass (scope.orientation);

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
        setOrientation (element, newOrientation, currentOrientation);
      });
      
      scope.$watch ('mode', function (newMode, currentMode) {
        setMode (element, newMode, currentMode);
      });
      
      element.on ('$destroy', function() {
        console.log ("vsButton $destroy");
      });
    }
  };                 
});