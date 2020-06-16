'use strict';

(function () {

  var ROOMS_DISABLED_GUEST = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var MESSAGE_CAPACITY = {
    '1': 'Вы можете выбрать для 1 гостя',
    '2': 'Вы можете выбрать для 1 гостя или для 2 гостей',
    '3': 'Вы можете выбрать для 1 гостя, для 2 или 3 гостей',
    '100': 'Вы можете выбрать только нет гостей'
  };

  var selectTimeIn = window.dataProject.formAdForm.querySelector('select[name="timein"]');
  var selectTimeOut = window.dataProject.formAdForm.querySelector('select[name="timeout"]');

  function getMessagePrice() {
    if (window.dataProject.inputPrice.value < window.dataProject.inputPrice.min) {
      window.dataProject.inputPrice.setCustomValidity('для данного типа жилья \nминимальная цена должна быть выше');
    } else {
      window.dataProject.inputPrice.setCustomValidity('');
    }
  }

  window.dataProject.selectFlatType.addEventListener('change', function () {
    window.utils.getPrice();
    getMessagePrice();
  });

  window.dataProject.inputPrice.addEventListener('change', function () {
    getMessagePrice();
  });

  function getMessageCapacity() {
    if (ROOMS_DISABLED_GUEST[window.dataProject.selectRooms.value].includes(window.dataProject.selectCapacity.value)) {
      window.dataProject.selectCapacity.setCustomValidity('');
    } else {
      window.dataProject.selectCapacity.setCustomValidity(MESSAGE_CAPACITY[window.dataProject.selectRooms.value]);
    }
  }

  window.dataProject.selectRooms.addEventListener('change', function () {
    for (var p = 0; p < window.dataProject.selectCapacity.options.length; p++) {
      if (ROOMS_DISABLED_GUEST[window.dataProject.selectRooms.value].includes(window.dataProject.selectCapacity.options[p].value)) {
        window.dataProject.selectCapacity[p].disabled = false;
      } else {
        window.dataProject.selectCapacity[p].disabled = true;
      }
    }
    getMessageCapacity();
  });

  window.dataProject.selectCapacity.addEventListener('change', function () {
    getMessageCapacity();
  });

  selectTimeIn.addEventListener('change', function () {
    selectTimeOut.value = selectTimeIn.value;
  });

  selectTimeOut.addEventListener('change', function () {
    selectTimeIn.value = selectTimeOut.value;
  });

})();