var vinisketch = angular.module ('vinisketch', ['ngTouch']);

vinisketch.array = function (array) {

  if (array.remove) return array;

  if (angular.isString (array)) {
    try {
      array = JSON.parse (array);
    }
    catch (e) {
      array = null
    }
  }
  
  if (!angular.isArray (array)) {
    console.warn ("ERROR vinisketch.array parameter is not an Array");
    return;
  }

  function _remove (array, from, to) {
    var rest = array.slice ((to || from) + 1 || array.length);
    array.length = from < 0 ? array.length + from : from;
    return array.push.apply (array, rest);
  }

  array.remove = function (from, to) {

    if (angular.isUndefined (to)) {
      var i = 0;
      while (i < this.length) {
        if (this[i] === from) {
          _remove (this, i);
        }
        else { i++; }
      }
    }
    else {
      _remove (this, from, to);
    }
    return this;
  };

  return array;
};
vinisketch.directive ('vsButton', function() {

  function setStyle (element, scope, newStyle) {
    if (newStyle) {
      if (scope.style) {
        element.removeClass (scope.style);
        scope.style = "";
      }
      
      switch (newStyle) {
        case "":
          newStyle = "white";
          break;
        case "black":
          break;
        case "green":
        case "red":
        case "grey":
        case "white":
          break;
        default:
          console.warn ("Unsuported button.style: " + newStyle);
          return;
      }
      scope.style = newStyle;
      element.addClass (scope.style);
    }
  }
  
  function setType (element, scope, newType) {

    if (newType) {
      if (scope.type) {
        element.removeClass (scope.type);
        scope.type = "";
      }
      
      switch (newType) {
        case "":
          newType = "default";
          break;
        case "nav":
        case "nav_back":
        case "nav_forward":
        case "default":
          break;
        default:
          console.warn ("Unsuported button.type: " + newType);
          return;
      }
      scope.type = newType;
      element.addClass (scope.type);
    }
  }

  return {
    restrict: 'E',
    
    transclude: true,
    
    scope: {
      type: "@",
      style: "@"
    },

    controller: function ($scope) {
      $scope.value = "";
      $scope.type = "default";
      $scope.style = "white";
    },
    
    template : "<div>{{value}}</div>",
  
    link: function (scope, element, attrs, controller, transclude) {

      element.addClass ("vs_ui_button");
      
      if (attrs.type) {
        setType (element, scope, attrs.type);
      }
      else {
        element.addClass (scope.type);
      }
      if (attrs.style) {
        setStyle (element, scope, attrs.style);
      }
      else {
        element.addClass (scope.style);
      }

      scope.$watch ('style', function (newStyle) {
        setStyle (element, scope, newStyle);
      });
      
      scope.$watch ('type', function (newType) {
        setType (element, scope, newType);
      });
      
      transclude (scope, function (cloned) {
        scope.value = cloned.text ();
      });
      
      element.on ('$destroy', function() {
        console.log ("vsButton $destroy");
      });
    }
  };
                      
});
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
// vinisketch.directive ('vsItem', function() {

//   var input_id = 0;

//   return {
//     restrict: 'E',
// //    replace: true,
//     transclude: true,

//     controller: function ($scope) {},
  
//     link: function (scope, element, attrs, controller, transclude) {

//       var ng_view_node = angular.element (element [0]);

//       transclude (scope, function (cloned) {
//         ng_view_node.append (cloned);
//       });

//       element.on ('$destroy', function() {
//         console.log ("vsItem $destroy");
//       });
//     }
//   };
                      
// });
vinisketch.directive ('vsRadioButton', function() {

  var input_id = 0;

  return {
    restrict: 'E',
    
    transclude: true,
    
    scope: {
      index : "@"
    },

    controller: function ($scope) {
      $scope.index = -1;
    },
    
    template: "<fieldset></fieldset>",
  
    link: function (scope, element, attrs, controller, transclude) {

      element.addClass ("vs_ui_radiobutton");

      var view_node = element[0];
      var fieldset_node = view_node.querySelector ('fieldset');
      var id = 'vs_radio_id' + input_id++;

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
        var index = 0;
        for (var i = 0, l = cloned.length; i < l; i++) {
          var item = cloned [i];
          if (item.tagName == 'VS-ITEM') {

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

            angular.element (fieldset_node).append (input);
            angular.element (fieldset_node).append (label);

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
      }

      element.on ('$destroy', function() {
        console.log ("vsSwitch $destroy");
      });
    }
  };
                      
});
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
vinisketch.directive ('vsSegmentedButton', function() {
  
  var input_id = 0;

  function setType (element, scope, newType, curentType) {

    if (curentType) element.removeClass (curentType);
    
    switch (newType) {
      case "":
      case undefined:
      case null:
        newType = "default";
        break;
      case "bar":
      case "default":
        break;
      default:
        console.warn ("Unsuported button.type: " + newType);
        newType = "default";
        return;
    }

    scope.type = newType;
    element.addClass (newType);
  }

  return {
    restrict: 'E',
    
    transclude: true,
    
    scope: {
      type: "@",
      index: "@"
    },

    controller: function ($scope) {
      $scope.type = "default";
    },
    
    template : "<div></div>",
  
    link: function (scope, element, attrs, controller, transclude) {

      element.addClass ("vs_ui_segmentedbutton");

      var view_node = element[0];
      var fieldset_node = view_node.querySelector ('div');
      var id = 'vs_seg_id' + input_id++;
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
            angular.element (fieldset_node).append (div);

            index ++;
          }
        }
        selectIndex (scope.index);
      });

      // if (attrs.type) {
      //   setType (element, scope, attrs.type);
      // }
      // else {
      //   element.addClass (scope.type);
      // }

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

      scope.$watch ('type', function (newType, curentType) {
        setType (element, scope, newType, curentType);
      });
            
      element.on ('$destroy', function() {
        console.log ("vsSegmentedButton $destroy");
      });
    }
  };
                      
});
vinisketch.directive ('vsImage', function() {
  
  function setStrech (element, newStrech, currentStrech) {

    element.removeClass (currentStrech);

    switch (newStrech) {
      case undefined:
      case null:
      case "":
      case "none":
        newStrech = "";
        break;
      case "fill":
      case "uniform":
      case "uniform-fill":
        break;
      default:
        console.warn ("Unsuported Image.strech: " + newStrech);
        return;
    }
    element.addClass (newStrech);
  }

  function configureImageSize (strech, view_node, image_node) {
    if (!view_node.__width) {
      return;
    }
    image_node.removeAttribute ('height');
    image_node.removeAttribute ('width');

    var width = view_node.offsetWidth;
    var height = view_node.offsetHeight;

    if (strech == "uniform") {
      var
        r1 = width / height,
        r2 = view_node.__width / view_node.__height,
        delta = 0,
        scale = 1;
    
      if (r1 < r2) {
        scale = view_node.__width / width;
        delta = (height - view_node.__height / scale) / 2;
        image_node.setAttribute ('width', "100%");
        
        image_node.style.left = "0px";
        image_node.style.top = delta + "px";
      }
      else {
        scale = view_node.__height / height;
        delta = (width - view_node.__width / scale) / 2;
        image_node.setAttribute ('height', "100%");
        image_node.style.top = "0px";
        image_node.style.left = delta + "px";
      }
    }
    else if (strech === "uniform-fill")
    {
      var
        r1 = width / height,
        r2 = view_node.__width / view_node.__height;
    
      if (r1 > r2) {
        image_node.setAttribute ('width', "100%");
        image_node.removeAttribute ('height');
      }
      else {
        image_node.removeAttribute ('width');
        image_node.setAttribute ('height', "100%");
      }
    }    
  }

  function preloadImage (scope, src, view_node, image_node) {
    var image = new Image ();
    image.onload = function (e) {
      image_node.src = src;
      view_node.__width = this.width;
      view_node.__height = this.height;
      configureImageSize (scope.strech, view_node, image_node);
    };
    image.src = src;
  }

  return {
    restrict: 'E',
    
    transclude: true,
    
    scope: {
      src: "@",
      strech: "@"
    },

    controller: function ($scope) {
      $scope.src = "";
      $scope.strech = "";
    },
    
    template : "<img></img>",
  
    link: function (scope, element, attrs, controller, transclude) {

      element.addClass ("vs_ui_imageview");
      var view_node = element[0];
      var image_node = view_node.querySelector ('img');

      scope.$watch ('strech', function (newStrech, currentStrech) {
        setStrech (element, newStrech, currentStrech);
        configureImageSize (scope.strech, view_node, image_node);
      });
      
      scope.$watch ('src', function (newType) {
        preloadImage (scope, newType, view_node, image_node);
      });
      
      element.on ('$destroy', function() {
        console.log ("vsButton $destroy");
      });
    }
  };                 
});
vinisketch.directive ('vsSplitView', function() {
  
  return {
    restrict: 'E',
    
    transclude: false,
    
    scope: {
    },

    controller: function ($scope) {
    },
    
    template : "",
  
    link: function (scope, element, attrs, controller, transclude) {

      element.addClass ("vs_ui_splitview");
      var view_node = element[0];
      var main_panel_node = view_node.querySelector ('vs-main-panel');
      var secondary_panel_node = view_node.querySelector ('vs-secondary-panel');
   
      // scope.$watch ('strech', function (newStrech, currentStrech) {
      //   setStrech (element, newStrech, currentStrech);
      //   configureImageSize (scope.strech, view_node, image_node);
      // });
      
      // scope.$watch ('src', function (newType) {
      //   preloadImage (scope, newType, view_node, image_node);
      // });
      
      element.on ('$destroy', function() {
        console.log ("vsButton $destroy");
      });
    }
  };                 
});