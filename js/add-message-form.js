'use strict';

(function () {

  var roomsDisabledGuest = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var messageCapacity = {
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
  var adFormPhoto = document.querySelector('.ad-form__photo');

  var templateSuccess = document.querySelector('#success')
    .content
    .querySelector('.success');
  var templateError = document.querySelector('#error')
    .content
    .querySelector('.error');

  var uploadMessage;

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
    if (roomsDisabledGuest[window.dataProject.selectRooms.value].includes(window.dataProject.selectCapacity.value)) {
      window.dataProject.selectCapacity.setCustomValidity('');
    } else {
      window.dataProject.selectCapacity.setCustomValidity(messageCapacity[window.dataProject.selectRooms.value]);
    }
  }

  window.dataProject.selectRooms.addEventListener('change', function () {
    Array.from(window.dataProject.selectCapacity.options).forEach(function (item) {
      item.disabled =
      !roomsDisabledGuest[window.dataProject.selectRooms.value].includes(item.value);
    });
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
    adFormPhoto.innerHTML = '';
    window.main.getDeactivation();
  }

  function getSuccessMessage() {
    uploadMessage = templateSuccess.cloneNode(true);
    main.appendChild(uploadMessage);
    uploadMessage.addEventListener('click', onMessageClick);
    uploadMessage.setAttribute('tabindex', 0);
    uploadMessage.focus();
    document.addEventListener('keydown', onMessageEscPress);
  }

  function getErrorMessage() {
    uploadMessage = templateError.cloneNode(true);
    main.appendChild(uploadMessage);
    uploadMessage.addEventListener('click', onMessageClick);
    document.addEventListener('keydown', onMessageEscPress);
  }

  window.addMessageForm = getErrorMessage;

  function onMessageEscPress(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      if (uploadMessage) {
        closeMessage(uploadMessage);
      }
    }
  }

  function onMessageClick(evt) {
    closeMessage(evt.currentTarget);
  }

  function closeMessage(popUpMessage) {
    main.removeChild(popUpMessage);
    document.removeEventListener('keydown', onMessageEscPress);
    uploadMessage = undefined;
  }

  function onUploadSuccess() {
    getReset();
    getSuccessMessage();
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
