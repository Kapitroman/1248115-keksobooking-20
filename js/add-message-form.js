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

  var main = document.querySelector('main');
  var formMapFilters = document.querySelector('.map__filters');
  var resetButton = window.dataProject.formAdForm.querySelector('.ad-form__reset');
  var selectTimeIn = window.dataProject.formAdForm.querySelector('select[name="timein"]');
  var selectTimeOut = window.dataProject.formAdForm.querySelector('select[name="timeout"]');

  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var adFormFoto = document.querySelector('.ad-form__photo');

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

  function getReset() {
    window.dataProject.formAdForm.reset();
    formMapFilters.reset();
    previewAvatar.src = 'img/muffin-grey.svg';
    adFormFoto.innerHTML = '';
    window.main.getDeactivation();
  }

  function getSuccessMessage() {
    var templateSuccess = document.querySelector('#success')
      .content
      .querySelector('.success');
    var successMessage = templateSuccess.cloneNode(true);
    main.appendChild(successMessage);
    successMessage.addEventListener('click', onMessageClick);
    document.addEventListener('keydown', onMessageEscPress);
  }

  function getErrorMessage() {
    var templateError = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorMessage = templateError.cloneNode(true);
    main.appendChild(errorMessage);
    errorMessage.addEventListener('click', onMessageClick);
    document.addEventListener('keydown', onMessageEscPress);
  }

  window.addMessageForm = getErrorMessage;

  function onMessageEscPress(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      if (main.querySelector('.success')) {
        closeMessage(main.querySelector('.success'));
      }
      if (main.querySelector('.error')) {
        closeMessage(main.querySelector('.error'));
      }
    }
  }

  function onMessageClick(evt) {
    closeMessage(evt.currentTarget);
  }

  function closeMessage(obj) {
    main.removeChild(obj);
    document.removeEventListener('keydown', onMessageEscPress);
  }

  function onUploadSuccess() {
    getReset();
    getSuccessMessage();
    document.querySelector('.map__pin--main').focus();
  }

  function onUploadError() {
    getErrorMessage();
  }

  window.dataProject.formAdForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.sendRequest(new FormData(window.dataProject.formAdForm), onUploadSuccess, onUploadError);
  });

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    getReset();
  });

})();
