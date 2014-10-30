vinisketch.directive ('vsHref', function ($timeout, $location) {

  var allowedOptions = ['location', 'inherit', 'reload'];

  return {
    restrict: 'A',

    link: function (scope, element, attrs) {
      var ref = attrs.vsHref

      element.bind("click", function(e) {
        if (!angular.isString (ref)) {
          return false;
        }
        var button = e.which || e.button;
        if ( !(button > 1 || e.ctrlKey || e.metaKey || e.shiftKey || element.attr ('target')) ) {
          document.location.href = ref;
          e.preventDefault();
        }
      });
    }
  };
});