vinisketch.directive ('vsSwitch', function() {

  var index_id = 0;

  return {
    restrict: 'E',
    
    transclude: true,
    
    scope: {
     textOn: "@",
     textOff: "@",
     checked: "@"
    },

    controller: function ($scope) {
      $scope.textOn = "";
      $scope.textOff = "";
      $scope.checked = false;
    },
    
    template: "<input type=\"checkbox\"><label></label>",
  
    link: function (scope, element, attrs, controller, transclude) {

      element.addClass ("vs_ui_switch");

      var input_id = 'vs_switch_id' + index_id++;
      var checkbox = element[0].querySelector ('input');
      var ng_checkbox = angular.element (checkbox);
      var ng_label = angular.element(element[0].querySelector ('label'));
      ng_checkbox.attr ('id', input_id);
      ng_label.attr ('for', input_id);

      checkbox.checked = scope.checked;

      ng_checkbox.bind ('change', function (event) {
        scope.checked = checkbox.checked;
        scope.$apply ();
      });

      scope.$watch ('checked', function (value) {
        scope.checked = angular.isDefined (value) && value !== false;
        checkbox.checked = scope.checked;
        if (attrs.ngModel) {
          scope.$parent[attrs.ngModel] = scope.checked;
        }
      });

      scope.$watch ('textOn', function (text) {
        if (!!text) {
          ng_label.attr ('data-on', text);
        }
      });

      scope.$watch ('textOff', function (text) {
        if (!!text) {
          ng_label.attr ('data-off', text);
        }
      });

      if (attrs.ngModel) {
        scope.$parent.$watch (attrs.ngModel, function(value) {
          scope.checked = !!value;
          checkbox.checked = scope.checked;
        });

        scope.$parent[attrs.ngModel] = !!element.attr('checked');
      }

      element.on ('$destroy', function() {
        console.log ("vsSwitch $destroy");
      });
    }
  };
                      
});