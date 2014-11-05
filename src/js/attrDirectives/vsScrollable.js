
vinisketch.directive ('vsScrollable', function () {

  return {
    replace: false,
    restrict: 'A',

    link: function (scope, element, attr) {

      // default options
      var options = {
        // scroll only vertically
        scrollX: false,
        scrollY: true,
        // paint scrollbars
        scrollbars: true,
        // make scrollbars draggable
        interactiveScrollbars: true,
        // allow scrolling by wheel
        mouseWheel: true
      };

      // iScroll initialize function
      function setScroll () {
        element[0].__iscroll = new window.IScroll (element[0], options);
      }

      // options parse
      if (attr.vsScrollable) {
        var tmp_options = scope.$eval (attr.vsScrollable);
        for (var key in tmp_options) {
          options [key] = tmp_options [key];
        }
      }

      // watch for 'ng-scrollable' directive in html code
      scope.$watch (attr.vsScrollable, function () {
        if (attr.vsScrollable == undefined) {
          // clean iscrall
          if (element[0].__iscroll) {
            element[0].__iscroll.destroy ();
            element[0].__iscroll = null;
          }
          return;
        }
        setScroll ();
      });

      element.on ('$destroy', function() {
        if (element[0].__iscroll) {
          element[0].__iscroll.destroy ();
          element[0].__iscroll = null;
        }
        console.log ("vsScrollable $destroy");
      });
    }
  }
});