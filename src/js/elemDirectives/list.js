vinisketch.directive ('vsList', function() {

  return {
    restrict: 'E',
    transclude: true,
    replace: false,
    
    scope: {
      title: "@"
    },

    controller: function ($scope) {},
    
    template: "<fieldset><div>{{title}}</div><ul ng-transclude/></fieldset>",

    link: function (scope, element, attrs, controller, transclude) {

      element.addClass ("vs_ui_list");

      element.on ('$destroy', function() {
        console.log ("vsList $destroy");
      });
    }
  };
});