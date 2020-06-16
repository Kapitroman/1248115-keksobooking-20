'use strict';

(function () {

  var SIZES_PIN_START = [62, 31];

  function setDisabled(elem) {
    for (var i = 0; i < elem.length; i++) {
      elem[i].setAttribute('disabled', '');
    }
  }

  setDisabled(window.dataProject.formSelects);
  setDisabled(window.dataProject.formFieldsets);

  window.dataProject.inputAddress.value = window.utils.getAddressForm(window.dataProject.mapPinMain, SIZES_PIN_START);

})();
