'use strict';

(function () {

  window.utils = {
    getAddressForm: function (element, pin) {
      var xElement = element.style.left;
      var yElement = element.style.top;
      return Math.round(parseInt(xElement, 10) + pin[0] / 2) + ', ' + Math.round(parseInt(yElement, 10) + pin[1]);
    },
    getPrice: function () {
      window.dataProject.inputPrice.min = window.dataProject.typeFlat[window.dataProject.selectFlatType.value][1];
      window.dataProject.inputPrice.placeholder = window.dataProject.typeFlat[window.dataProject.selectFlatType.value][1];
    },
    setDisabled: function (element) {
      Array.from(element).forEach(function (item) {
        item.setAttribute('disabled', '');
      });
    },
    removeDisabled: function (element) {
      Array.from(element).forEach(function (item) {
        item.removeAttribute('disabled');
      });
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
      Array.from(onlyMapPins).forEach(function (item) {
        if (!item.classList.contains('map__pin--main')) {
          window.dataProject.mapPins.removeChild(item);
        }
      });
    }
  };

})();
