vinisketch.directive ('vsCheckBox', function() {

  var input_id = 0;

  function parseIndexes (indexes) {
    if (angular.isString (indexes)) {
      try {
        indexes = JSON.parse (indexes);
      }
      catch (e) {
        indexes = null;
      }
    }
    if (!angular.isArray (indexes)) {
      console.warn ("ERROR with checkbox 'indexes' data");
      indexes = [];
    }
    return indexes;
  }

  function udpateModel (attrs, scope) {
    if (attrs.ngModel) {
      var model = scope.$parent [attrs.ngModel];
      if (!angular.isArray (model)) {
        model = scope.indexes.slice ();
        scope.$parent[attrs.ngModel] = model;
      }
      else {
        model.length = 0;
        model.push.apply (model, scope.indexes);
      }
    }
  }

  return {
    restrict: 'E',
    
    transclude: true,
    
    scope: {
      indexes : "@"
    },

    controller: function ($scope) {
      $scope.indexes = [];
    },
    
    template: "<fieldset></fieldset>",

  
    link: function (scope, element, attrs, controller, transclude) {

      element.addClass ("vs_ui_checkbox");

      var view_node = element[0];
      var fieldset_node = view_node.querySelector ('fieldset');
      var id = 'vs_check_id' + input_id++;

      function selectIndexes (indexes) {
        
        indexes = parseIndexes (indexes);

        var inputs = view_node.querySelectorAll ('input');
        for (var index = 0; index < inputs.length; index ++) {
          input = inputs.item (index);
          if (indexes.indexOf (index) >= 0) {
            input.checked = true;
          }
          else {
            input.checked = false;
          }
        }
        scope.indexes = indexes;

        return true;
      }

      transclude (scope, function (cloned) {
        var index = 0;
        for (var i = 0, l = cloned.length; i < l; i++) {
          var item = cloned [i];
          if (item.tagName == 'VS-ITEM') {

            var input = document.createElement ('input');
            input.type = 'checkbox';
            input.name = id;
            input.__index = index;
            input.id = id + index;

            input.addEventListener ('change', function (event) {
              var input = event.target;
              if (!angular.isArray (scope.indexes)) scope.indexes = [];
              if (input.checked) {
                scope.indexes.push (input.__index);
              }
              else {
                vinisketch.array (scope.indexes).remove (input.__index);
              }
              udpateModel (attrs, scope);
              scope.$apply ();
            });

            var label = document.createElement ('label');
            label.setAttribute ("for", id + index);
            angular.element (label).append (item);

            angular.element (fieldset_node).append (input);
            angular.element (fieldset_node).append (label);

            index ++;
          }
        }
        selectIndexes (scope.indexes);
      });

      scope.$watch ('indexes', function (indexes) {

        if (angular.isUndefined (indexes)) return;

        scope.indexes = parseIndexes (indexes);

        if (selectIndexes (scope.indexes)) {
          udpateModel (attrs, scope);
        }
      });

      if (attrs.ngModel) {
        scope.$parent.$watch (attrs.ngModel, function (model) {

          if (angular.isUndefined (model)) return;

          indexes = parseIndexes (model);

          if (!angular.isArray (scope.indexes)) scope.indexes = [];
          scope.indexes.length = 0;
          scope.indexes.push.apply (scope.indexes, indexes);
        });
      }

      element.on ('$destroy', function() {
        console.log ("vsSwitch $destroy");
      });
    }
  };
                      
});