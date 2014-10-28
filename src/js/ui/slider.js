vinisketch.directive ('vsSlider', function() {

  function setValue (v, scope, handle_node, view_node) {
    var
      height, width,
      handle_width = handle_node.offsetWidth,
      style_transform, style_size,
      handleX = 0, handleY = 0;
    
    if (v < scope.range [0]) { v = scope.range [0]; }
    if (v > scope.range [1]) { v = scope.range [1]; }

    var d1 = handle_width / 2, d2 = 0;
    
    handleX = Math.floor ((v - scope.range [0]) * view_node.offsetWidth /
      (scope.range [1] - scope.range [0])) - d1;
      
    style_transform = "translate3d(" + handleX + "px,-" + d2 + "px,0)";
    style_size = (handleX + d1) + "px 10px";

    handle_node.style.transform = style_transform;
    view_node.style.backgroundSize = style_size;

    return v;
  }

  function setRange (range, scope) {
    if (angular.isString (range)) {
      try {
        range = JSON.parse (range);
      }
      catch (e) {
        console.warn ("ERROR with slider 'range' attribute");
        return false;
      }
    }
    if (!angular.isArray (range)) return false;

    scope.range = range;
    return true;
  }

  return {
    restrict: 'E',
    
    transclude: true,
    
    scope: {
      value: "@",
    },

    controller: function ($scope) {
      $scope.value = 0;
      $scope.range = [0, 100];
    },
    
    template: "<div class=\"handle\"></div>",
  
    link: function (scope, element, attrs, controller, transclude) {

      element.addClass ("vs_ui_slider");

      var ng_document = angular.element (document);
      var handle_node = element[0].querySelector ('.handle');
      var view_node = element[0];
      var pageX, pageY, current_value, t_handleX = 0, t_handleY = 0;

      function didDragStart (e) {

        ng_document.bind ("touchmove mousemove", didDrag);
        ng_document.bind ("touchmove mousemove", didDrag);
        ng_document.bind ("touchcancel", didDragEnd);
        ng_document.bind ("touchend mouseup", didDragEnd);

        var handle_radius = handle_node.offsetWidth / 2;

        // set the new handler position
        pageX = e.pageX;
        pageY = e.pageY;
        t_handleX = Math.floor ((scope.value - scope.range [0]) * view_node.offsetWidth /
        (scope.range [1] - scope.range [0])) - handle_radius + handle_node.offsetWidth / 2;
        t_handleY = Math.floor ((scope.value - scope.range [0]) * view_node.offsetHeight /
        (scope.range [1] - scope.range [0])) - handle_radius + handle_node.offsetHeight/ 2;
 
        if (attrs.ngModel) {
          scope.$parent[attrs.ngModel] = scope.value;
        }
        scope.$apply ();
      }
      
      function didDrag (e) {
     
        // do not manage event for other targets
        var dx = e.pageX - pageX;
        var dy = e.pageY - pageY;
        var value;
        
        value = scope.range [0] +
          (scope.range [1] - scope.range [0]) * (t_handleX + dx) / view_node.offsetWidth;

        scope.value = setValue (value, scope, handle_node, view_node);

        if (attrs.ngModel) {
          scope.$parent[attrs.ngModel] = scope.value;
        }
        scope.$apply ();
      }
        
      function didDragEnd (e) {
        ng_document.unbind ("touchmove mousemove", didDrag);
        ng_document.unbind ("touchmove mousemove", didDrag);
        ng_document.unbind ("touchcancel", didDragEnd);
        ng_document.unbind ("touchend mouseup", didDragEnd);
      }
      element.bind ('touchstart mousedown', didDragStart);

      scope.$watch ('value', function (value) {
        if (angular.isUndefined (value)) return;

        value = parseInt (value, 10);
        if (isNaN (value) || !angular.isNumber (value)) value = 0;

        scope.value = setValue (value, scope, handle_node, view_node);

        if (attrs.ngModel) {
          scope.$parent[attrs.ngModel] = scope.value;
        }
      });

      scope.$watch ('range', function (range) {
        if (setRange (range, scope)) {
          scope.value = setValue (scope.value, scope, handle_node, view_node);
        }
      });

      if (attrs.ngModel) {
        scope.$parent.$watch (attrs.ngModel, function (model) {
          if (angular.isUndefined (model)) return;

          scope.value = model;
        });
      }
      element.on ('$destroy', function() {
        element.unbind ('touchstart mousedown', didDragStart);
        console.log ("vsSwitch $destroy");
      });

      setValue (scope.value, scope, handle_node, view_node);
    }
  };
                      
});