'use strict';

(function () {

  var SIZES_PIN_MESSAGE = [50, 70];
  var MAX_RENDER_NUMBER = 5;

  var templatePin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
	
  // адаптация данных к измененному формату message на сервере;
  var LocItems = {
    MIN_LAT: 35.30000,
    MAX_LAT: 36.30000,
    MIN_LNG: 139.10000,
    MAX_LNG: 140.20000,
    DELTA_LAT: 1.0000,
    DELTA_LNG: 1.1000,
    MAX_X: 1200,
    MAX_Y: 630,
  };

  function adapterLocation(lat, lng) {
    const x = (lat - LocItems.MIN_LAT) / LocItems.DELTA_LAT * LocItems.MAX_X;
    const y = (lng - LocItems.MIN_LNG) / LocItems.DELTA_LNG * LocItems.MAX_Y;
    return {x: x, y: y};
  };

  function renderPin(message) {
	var location = adapterLocation(message.location.lat, message.location.lng); // получение адаптированных данных координат
    var pinOffer = templatePin.cloneNode(true);
    pinOffer.style = 'left: ' + (location.x - SIZES_PIN_MESSAGE[0] / 2) + 'px; top: ' + (location.y - SIZES_PIN_MESSAGE[1]) + 'px;';
	//pinOffer.style = 'left: ' + (message.location.x - SIZES_PIN_MESSAGE[0] / 2) + 'px; top: ' + (message.location.y - SIZES_PIN_MESSAGE[1]) + 'px;'; // предудущий код
    var imgPinOffer = pinOffer.querySelector('img');
    imgPinOffer.src = message.author.avatar;
    imgPinOffer.alt = message.offer.title;
    pinOffer.allData = message;

    return pinOffer;
  }

  window.renderListOfPins = function (data) {
    window.utils.clearPins();
    var fragment = document.createDocumentFragment();
    var renderNumber = data.length > MAX_RENDER_NUMBER ? MAX_RENDER_NUMBER : data.length;
    for (var r = 0; r < renderNumber; r++) {
      if (data[r].offer) {
        fragment.appendChild(renderPin(data[r]));
      }
    }
    window.dataProject.mapPins.appendChild(fragment);
  };

})();
