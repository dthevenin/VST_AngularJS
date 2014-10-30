vinisketch.directive ('vsList', function() {

  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    
    scope: {},

    controller: function ($scope) {},
    
    template: "<div class=\"vs_ui_list DefaultList\"><ul ng-transclude/></div>",

    link: function (scope, element, attrs, controller, transclude) {
      element.on ('$destroy', function() {
        console.log ("vsList $destroy");
      });
    }
  };
                      
});