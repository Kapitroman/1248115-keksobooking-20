'use strict';

(function () {

  window.utils = {
    getAddressForm: function (elem, pin) {
      var xElem = elem.style.left;
      var yElem = elem.style.top;
      return Math.round(parseInt(xElem, 10) + pin[0] / 2) + ', ' + Math.round(parseInt(yElem, 10) + pin[1]);
    },
    getPrice: function () {
      window.dataProject.inputPrice.min = window.dataProject.TYPE_FLAT[window.dataProject.selectFlatType.value][1];
      window.dataProject.inputPrice.placeholder = window.dataProject.TYPE_FLAT[window.dataProject.selectFlatType.value][1];
    },
    setDisabled: function (elem) {
      for (var i = 0; i < elem.length; i++) {
        elem[i].setAttribute('disabled', '');
      }
    },
    removeDisabled: function (elem) {
      for (var k = 0; k < elem.length; k++) {
        elem[k].removeAttribute('disabled');
      }
    },
    getTextContent: function (element, value) {
      if (value) {
        element.textContent = value;
      } else {
        element.style = 'display: none;';
      }
    },
    clearPins: function () {
      var onlyMapPins = window.dataProject.mapPins.querySelectorAll('.map__pin');
      for (var h = 0; h < onlyMapPins.length; h++) {
        if (!onlyMapPins[h].classList.contains('map__pin--main')) {
          window.dataProject.mapPins.removeChild(onlyMapPins[h]);
        }
      }
    }
  };

})();
