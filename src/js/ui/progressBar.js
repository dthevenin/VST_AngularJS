vinisketch.directive ('vsProgressBar', function() {

  function setValue (v, scope, view_node, progress_node) {
    var width;
    
    if (v < scope.range [0]) { v = scope.range [0]; }
    if (v > scope.range [1]) { v = scope.range [1]; }

    width = Math.floor ((v - scope.range [0]) * view_node.offsetWidth /
      (scope.range [1] - scope.range [0]));

    progress_node.style.width = width + "px";

    return v;
  }

  return {
    restrict: 'E',
    
    transclude: true,
    
    scope: {
      value: "@",
      range: "@",
      indeterminate: "@",
    },

    controller: function ($scope) {
      $scope.value = 0;
      $scope.range = [0, 100];
      $scope.indeterminate = false;
    },
    
    template: "<div></div>",
  
    link: function (scope, element, attrs, controller, transclude) {

      element.addClass ("vs_ui_progressbar");

      var view_node = element[0];
      var progress_node = view_node.querySelector ('div');

      scope.$watch ('value', function (value) {
        if (angular.isUndefined (value)) return;

        value = parseInt (value, 10);
        if (isNaN (value) || !angular.isNumber (value)) value = 0;

        scope.value = setValue (value, scope, view_node, progress_node);

        if (attrs.ngModel) {
          scope.$parent[attrs.ngModel] = scope.value;
        }
      });

      scope.$watch ('range', function (value) {

        function setDefaultRangeValue () {
          scope.range = [0, 100];
          scope.value = setValue (scope.value, scope, view_node, progress_node);
        }

        if (angular.isUndefined (value)) {
          setDefaultRangeValue ();
          return;
        }

        if (angular.isString (value)) {
          try {
            value = JSON.parse (value);
          }
          catch (e) {
            throw ("Invalid Progressbar range parameter");
          }
        }

        if (!angular.isArray (value)) {
          setDefaultRangeValue ();
          return;
        };

        scope.range = value;
        scope.value = setValue (scope.value, scope, view_node, progress_node);
      });

      scope.$watch ('indeterminate', function (value) {
        if (angular.isUndefined (value) || value == "false"  || value === false) {
          element.removeClass ("indeterminate");
        }
        else {
          element.addClass ("indeterminate");
        }
      });

      if (attrs.ngModel) {
        scope.$parent.$watch (attrs.ngModel, function (model) {
          if (angular.isUndefined (model)) return;

          scope.value = model;
        });
      }
      element.on ('$destroy', function() {
        console.log ("vsSwitch $destroy");
      });

      setValue (scope.value, scope, view_node, progress_node);
    }
  };
                      
});