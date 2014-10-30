vinisketch.directive ('vsTextInput', function() {

  return {
    restrict: 'E',
    
    transclude: true,
    
    scope: {
     type: "@",
     placeholder: "@",
    },

    controller: function ($scope) {
      $scope.type = "text";
      $scope.placeholder = "";
      $scope.value = "";
    },
    
    template: "<input incremental=\"incremental\"/><div class='clear_button'/>",
  
    link: function (scope, element, attrs, controller, transclude) {

      element.addClass ("vs_ui_textinput");

      var input = element[0].querySelector ('input');
      var ng_input = angular.element (input);

      input.value = scope.value;

      ng_input.bind ('input', function (event) {
        scope.value = angular.isUndefined (input.value)?"":input.value;
        scope.$apply ();
      });

      scope.$watch ('value', function (value) {
        scope.value = angular.isUndefined (value)?"":value;
        input.value = scope.value;
        if (attrs.ngModel) {
          scope.$parent[attrs.ngModel] = scope.value;
        }
      });

      scope.$watch ('type', function (value) {
        input.type = angular.isUndefined (value)?"text":value;
      });

      scope.$watch ('placeholder', function (value) {
        input.placeholder = angular.isUndefined (value)?"":value;
      });

      if (attrs.ngModel) {
        scope.$parent.$watch (attrs.ngModel, function (value) {
          scope.value = angular.isUndefined (value)?"":value;;
          input.value = scope.value;
        });

        scope.$parent[attrs.ngModel] = element.attr('value');
      }

      element.on ('$destroy', function() {
        console.log ("vsSwitch $destroy");
      });
    }
  };
                      
});