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