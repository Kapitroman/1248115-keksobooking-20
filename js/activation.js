'use strict';

(function () {

  var SIZES_PIN_START = [62, 31];
  var SIZES_PIN = [62, 84];

  var mapPinMain = window.dataProject.map.querySelector('.map__pin--main');
  var formSelects = document.querySelectorAll('select');
  var formFieldsets = document.querySelectorAll('fieldset');
  var inputAddress = window.dataProject.formAdForm.querySelector('input[name="address"]');

  window.utils.setDisabled(formSelects);
  window.utils.setDisabled(formFieldsets);

  inputAddress.value = window.utils.getAddressForm(mapPinMain, SIZES_PIN_START);

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0 && window.dataProject.map.classList.contains('map--faded')) {
      getActivation();
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter' && window.dataProject.map.classList.contains('map--faded')) {
      getActivation();
    }
  });

  function getActivation() {
    window.dataProject.map.classList.remove('map--faded');
    window.dataProject.formAdForm.classList.remove('ad-form--disabled');
    window.renderListOfPins();
    window.utils.removeDisabled(formSelects);
    window.utils.removeDisabled(formFieldsets);
    inputAddress.value = window.utils.getAddressForm(mapPinMain, SIZES_PIN);
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
