
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

      var iScrollRef;

      // iScroll initialize function
      function setScroll () {
        iScrollRef = new window.IScroll (element[0], options);
      }

      // watch for 'ng-scrollable' directive in html code
      scope.$watch (attr.vsScrollable, function () {
        if (attr.vsScrollable == undefined) {
          // clean iscrall
          if (iScrollRef) {
            iScrollRef.destroy ();
            iScrollRef = null;
          }
          return;
        }
        setScroll ();
      });

      element.on ('$destroy', function() {
        if (iScrollRef) {
          iScrollRef.destroy ();
          iScrollRef = null;
        }
        console.log ("vsScrollable $destroy");
      });
    }
  }
});