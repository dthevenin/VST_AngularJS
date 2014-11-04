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
      if (view_node.__iscroll) {
        view_node.__iscroll.refresh ();
      }
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