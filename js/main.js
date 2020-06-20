'use strict';

(function () {

  var SIZES_PIN_START = [62, 31];
  var SIZES_PIN = [62, 84];
  var borderLeft = 0 - SIZES_PIN[0] / 2;
  var borderRight = window.dataProject.mapPins.offsetWidth - SIZES_PIN[0] / 2;
  var borderTop = 130 - SIZES_PIN[1];
  var borderBottom = 630 - SIZES_PIN[1];

  var mapPinMain = window.dataProject.map.querySelector('.map__pin--main');
  var formSelects = document.querySelectorAll('select');
  var formFieldsets = document.querySelectorAll('fieldset');
  var inputAddress = window.dataProject.formAdForm.querySelector('input[name="address"]');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var startX = mapPinMain.style.left;
  var startY = mapPinMain.style.top;


  window.utils.setDisabled(formSelects);
  window.utils.setDisabled(formFieldsets);

  inputAddress.value = window.utils.getAddressForm(mapPinMain, SIZES_PIN_START);

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var buttonMouse = evt.button;
    if (buttonMouse === 0 && window.dataProject.map.classList.contains('map--faded')) {
      getActivation();
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      if (buttonMouse !== 0) {
        return;
      }

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newPointX = mapPinMain.offsetLeft - shift.x;
      if (newPointX < borderLeft) {
        newPointX = borderLeft;
      }
      if (newPointX > borderRight) {
        newPointX = borderRight;
      }

      var newPointY = mapPinMain.offsetTop - shift.y;
      if (newPointY < borderTop) {
        newPointY = borderTop;
      }
      if (newPointY > borderBottom) {
        newPointY = borderBottom;
      }
      mapPinMain.style.left = newPointX + 'px';
      mapPinMain.style.top = newPointY + 'px';

      inputAddress.value = window.utils.getAddressForm(mapPinMain, SIZES_PIN);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter' && window.dataProject.map.classList.contains('map--faded')) {
      getActivation();
    }
  });

  function handlerClickClose() {
    closeCardMessage();
  }

  function handlerPressEsc(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeCardMessage();
    }
  }

  function closeCardMessage() {
    if (window.dataProject.map.querySelector('.popup')) {
      window.dataProject.map.removeChild(window.dataProject.map.querySelector('.popup'));
      document.removeEventListener('keydown', handlerPressEsc);
    }
  }

  function openCardMessage(evt) {
    var targetPin = evt.target.closest('.map__pin');
    if (!targetPin) {
      return;
    }
    if (targetPin.classList.contains('map__pin--main')) {
      return;
    }

    closeCardMessage();

    var openCard = window.createCard(targetPin.allData);
    window.dataProject.map.insertBefore(openCard, mapFiltersContainer);

    var popupClose = openCard.querySelector('.popup__close');
    popupClose.addEventListener('click', handlerClickClose);
    document.addEventListener('keydown', handlerPressEsc);
  }

  function successHandler(data) {
    window.renderListOfPins(data);
  }

  function errorHandler(errorMessage) {
    window.addMessageForm();
    window.utils.getTextContent(document.querySelector('.error__message'), errorMessage);
  }

  function getActivation() {
    window.dataProject.map.classList.remove('map--faded');
    window.dataProject.formAdForm.classList.remove('ad-form--disabled');

    window.dataProject.mapPins.addEventListener('click', openCardMessage);

    window.ajaxData(null, successHandler, errorHandler);

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

  function getDeactivation() {

    closeCardMessage();

    var onlyMapPins = window.dataProject.mapPins.querySelectorAll('.map__pin');
    for (var h = 0; h < onlyMapPins.length; h++) {
      if (!onlyMapPins[h].classList.contains('map__pin--main')) {
        window.dataProject.mapPins.removeChild(onlyMapPins[h]);
      }
    }

    window.dataProject.mapPins.removeEventListener('click', openCardMessage);

    window.dataProject.inputPrice.min = 0;
    window.dataProject.inputPrice.placeholder = 5000;

    window.dataProject.map.classList.add('map--faded');
    window.dataProject.formAdForm.classList.add('ad-form--disabled');

    window.utils.setDisabled(formSelects);
    window.utils.setDisabled(formFieldsets);

    mapPinMain.style.left = startX;
    mapPinMain.style.top = startY;

    inputAddress.value = window.utils.getAddressForm(mapPinMain, SIZES_PIN_START);

  }

  window.main = getDeactivation;

})();
