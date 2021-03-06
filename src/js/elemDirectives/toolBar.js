vinisketch.directive ('vsToolBar', function() {
  
  var input_id = 0;

  return {
    restrict: 'E',
    
    transclude: true,
    
    scope: {
      index: "@"
    },

    controller: function ($scope) {
    },
  
    link: function (scope, element, attrs, controller, transclude) {

      element.addClass ("vs_ui_toolbar");
      
      var view_node = element[0];
      var id = 'vs_toolbar_id' + input_id++;
      var index = 0;

      function selectIndex (index) {
        if (angular.isUndefined (index)) return false;

        index = parseInt (index, 10);
        if (isNaN (index) || !angular.isNumber (index)) index = 0;

        var inputs = view_node.querySelectorAll ('input');
        var input = inputs.item (index);
        if (!input) {
          angular.element (inputs).attr ('checked', false);
        }
        else {
          input.checked = true;
        }
        return true;
      }

      transclude (scope, function (cloned) {
        for (var i = 0, l = cloned.length; i < l; i++) {
          var item = cloned [i];
          if (item.tagName == 'DIV') {
            var div = document.createElement ('div');

            var input = document.createElement ('input');
            input.type = 'radio';
            input.name = id;
            input.__index = index;
            input.id = id + index;

            input.addEventListener ('change', function (event) {
              scope.index = event.target.__index;
              scope.$apply ();
            });

            var label = document.createElement ('label');
            label.setAttribute ("for", id + index);
            angular.element (label).append (item);

            div.appendChild (input);
            div.appendChild (label);
            angular.element (view_node).append (div);

            index ++;
          }
        }
        selectIndex (scope.index);
      });

      scope.$watch ('index', function (index) {
        if (selectIndex (index)) {
          if (attrs.ngModel) {
            scope.$parent[attrs.ngModel] = scope.index;
          }
        }
      });

      if (attrs.ngModel) {
        scope.$parent.$watch (attrs.ngModel, function (model) {
          if (angular.isUndefined (model)) return;

          scope.index = model;
        });

        //scope.$parent[attrs.ngModel] = scope.index;
      }
            
      element.on ('$destroy', function() {
        console.log ("vsSegmentedButton $destroy");
      });
    }
  };
                      
});