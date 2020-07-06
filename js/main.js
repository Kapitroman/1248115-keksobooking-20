'use strict';

(function () {

  var SIZES_PIN_START = [62, 31];
  var SIZES_PIN = [62, 84];
  var borderLeft = 0 - SIZES_PIN[0] / 2;
  var borderRight = window.dataProject.mapPins.offsetWidth - SIZES_PIN[0] / 2;
  var borderTop = 130 - SIZES_PIN[1];
  var borderBottom = 630 - SIZES_PIN[1];

  var mapPinMain = window.dataProject.map.querySelector('.map__pin--main');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var selectsFilterForm = mapFiltersContainer.querySelectorAll('select');
  var fieldsetsFilterForm = mapFiltersContainer.querySelectorAll('fieldset');
  var selectsAdForm = window.dataProject.formAdForm.querySelectorAll('select');
  var fieldsetsAdForm = window.dataProject.formAdForm.querySelectorAll('fieldset');
  var inputAddress = window.dataProject.formAdForm.querySelector('input[name="address"]');
  var startX = mapPinMain.style.left;
  var startY = mapPinMain.style.top;

  window.utils.setDisabled(selectsFilterForm);
  window.utils.setDisabled(fieldsetsFilterForm);
  window.utils.setDisabled(selectsAdForm);
  window.utils.setDisabled(fieldsetsAdForm);

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

    function onMouseMove(moveEvt) {
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
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter' && window.dataProject.map.classList.contains('map--faded')) {
      getActivation();
    }
  });

  function onCardClick() {
    window.main.closeCardMessage();
  }

  function onCardEscPress(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      window.main.closeCardMessage();
    }
  }

  function onCardPinClick(evt) {
    var targetPin = evt.target.closest('.map__pin');
    if (!targetPin) {
      return;
    }
    if (targetPin.classList.contains('map__pin--main')) {
      return;
    }

    window.main.closeCardMessage();

    targetPin.classList.add('map__pin--active');

    var openedCard = window.createCard(targetPin.allData);
    window.dataProject.map.insertBefore(openedCard, mapFiltersContainer);

    var popupClose = openedCard.querySelector('.popup__close');
    popupClose.addEventListener('click', onCardClick);
    document.addEventListener('keydown', onCardEscPress);
  }

  function onSuccess(data) {
    window.main.serverMessages = data;
    window.renderListOfPins(window.main.serverMessages);
    window.utils.removeDisabled(selectsFilterForm);
    window.utils.removeDisabled(fieldsetsFilterForm);
  }

  function onError(errorMessage) {
    window.addMessageForm();
    window.utils.getTextContent(document.querySelector('.error__message'), errorMessage);
  }

  function getActivation() {
    window.dataProject.map.classList.remove('map--faded');
    window.dataProject.formAdForm.classList.remove('ad-form--disabled');

    window.dataProject.mapPins.addEventListener('click', onCardPinClick);

    window.sendRequest(null, onSuccess, onError);

    window.utils.removeDisabled(selectsAdForm);
    window.utils.removeDisabled(fieldsetsAdForm);

    inputAddress.value = window.utils.getAddressForm(mapPinMain, SIZES_PIN);
    /*
    for (var n = 0; n < window.dataProject.selectCapacity.options.length; n++) {
      if (window.dataProject.selectCapacity.options[n].value === '1') {
        window.dataProject.selectCapacity.options[n].selected = true;
      } else {
        window.dataProject.selectCapacity.options[n].disabled = true;
      }
    }
    */
    Array.from(window.dataProject.selectCapacity.options).forEach(function (item) {
      if (item.value === '1') {
        item.selected = true;
      } else {
        item.disabled = true;
      }
    });

    window.utils.getPrice();
  }

  window.main = {
    serverMessages: [],

    closeCardMessage: function () {
      var popup = window.dataProject.map.querySelector('.popup');
      if (popup) {
        window.dataProject.map.removeChild(popup);
        var mapPinsAll = document.querySelectorAll('.map__pin');
        for (var i = 0; i < mapPinsAll.length; i++) {
          if (mapPinsAll[i].classList.contains('map__pin--active')) {
            mapPinsAll[i].classList.remove('map__pin--active');
            break;
          }
        }
        document.removeEventListener('keydown', onCardEscPress);
      }
    },

    getDeactivation: function () {

      this.closeCardMessage();

      window.utils.clearPins();

      window.dataProject.mapPins.removeEventListener('click', onCardPinClick);

      window.dataProject.inputPrice.min = 0;
      window.dataProject.inputPrice.placeholder = 5000;

      window.dataProject.map.classList.add('map--faded');
      window.dataProject.formAdForm.classList.add('ad-form--disabled');

      window.utils.setDisabled(selectsFilterForm);
      window.utils.setDisabled(fieldsetsFilterForm);
      window.utils.setDisabled(selectsAdForm);
      window.utils.setDisabled(fieldsetsAdForm);

      mapPinMain.style.left = startX;
      mapPinMain.style.top = startY;

      inputAddress.value = window.utils.getAddressForm(mapPinMain, SIZES_PIN_START);
    }
  };

})();
