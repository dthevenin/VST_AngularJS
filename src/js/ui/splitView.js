vinisketch.directive ('vsSplitView', function() {
  
  return {
    restrict: 'E',
    
    transclude: false,
    
    scope: {
    },

    controller: function ($scope) {
    },
    
    template : "",
  
    link: function (scope, element, attrs, controller, transclude) {

      element.addClass ("vs_ui_splitview");
      var view_node = element[0];
      var main_panel_node = view_node.querySelector ('vs-main-panel');
      var secondary_panel_node = view_node.querySelector ('vs-secondary-panel');
   
      // scope.$watch ('strech', function (newStrech, currentStrech) {
      //   setStrech (element, newStrech, currentStrech);
      //   configureImageSize (scope.strech, view_node, image_node);
      // });
      
      // scope.$watch ('src', function (newType) {
      //   preloadImage (scope, newType, view_node, image_node);
      // });
      
      element.on ('$destroy', function() {
        console.log ("vsButton $destroy");
      });
    }
  };                 
});