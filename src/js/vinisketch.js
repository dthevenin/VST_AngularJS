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