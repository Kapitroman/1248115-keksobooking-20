'use strict';

(function () {

  var SIZES_PIN = [62, 84];

  window.dataProject.mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0 && window.dataProject.map.classList.contains('map--faded')) {
      getActivation();
    }
  });

  window.dataProject.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter' && window.dataProject.map.classList.contains('map--faded')) {
      getActivation();
    }
  });

  function removeDisabled(elem) {
    for (var k = 0; k < elem.length; k++) {
      elem[k].removeAttribute('disabled');
    }
  }

  function getActivation() {
    window.dataProject.map.classList.remove('map--faded');
    window.dataProject.formAdForm.classList.remove('ad-form--disabled');
    window.renderListOfPins();
    removeDisabled(window.dataProject.formSelects);
    removeDisabled(window.dataProject.formFieldsets);
    window.dataProject.inputAddress.value = window.utils.getAddressForm(window.dataProject.mapPinMain, SIZES_PIN);
    for (var n = 0; n < window.dataProject.selectCapacity.options.length; n++) {
      if (window.dataProject.selectCapacity.options[n].value === '1') {
        window.dataProject.selectCapacity.options[n].selected = true;
      } else {
        window.dataProject.selectCapacity.options[n].disabled = true;
      }
    }
    window.utils.getPrice();
  }

})();
