vinisketch.directive ('vsCombobox', function() {

  return {
    restrict: 'E',
    
    transclude: true,
    
    scope: {
      value: '@',
      selectedIndex: '@'
    },

    controller: function ($scope) {
      $scope.value = "";
      $scope.selectedIndex = "";
    },
    
    template : "<select></select>",
  
    link: function (scope, element, attrs, controller, transclude) {

      element.addClass ("vs_ui_combobox");

      var select = element[0].querySelector ('select');
      var ng_select = angular.element (select);
      
      transclude (scope, function (cloned) {
        ng_select.append (cloned);
      });
      
      ng_select.bind ('change', function (event) {
        scope.value = select.value;
        scope.selectedIndex = select.selectedIndex;
        if (attrs.ngModel) {
          scope.$parent[attrs.ngModel] = {
            value: scope.value,
            selectedIndex: scope.selectedIndex
          }
        }
        scope.$apply ();
      });

      scope.$watch ('value', function (value) {
        if (angular.isUndefined (value)) return;
        if (select.value == value) return;
        select.value = value;
        scope.selectedIndex = select.selectedIndex;
        if (attrs.ngModel) {
          scope.$parent[attrs.ngModel] = {
            value: scope.value,
            selectedIndex: scope.selectedIndex
          }
        }
      });

      scope.$watch ('selectedIndex', function (value) {
        value = parseInt (value, 10);
        if (isNaN (value) || !angular.isNumber (value)) return;
        if (select.selectedIndex === value) return;
        select.selectedIndex = value;
        scope.value = select.value;
        if (attrs.ngModel) {
          scope.$parent[attrs.ngModel] = {
            value: scope.value,
            selectedIndex: scope.selectedIndex
          }
        }
      });

      if (attrs.ngModel) {
        scope.$parent.$watch (attrs.ngModel, function (model) {
          if (angular.isUndefined (model)) return;

          if (!angular.isUndefined (model.value)) {
            scope.value = model.value;
          }
          else if (angular.isNumber (model.selectedIndex)) {
            scope.selectedIndex = model.selectedIndex;
          }
        });
      }

      element.on ('$destroy', function() {
        console.log ("vsButton $destroy");
      });
    }
  };
                      
});