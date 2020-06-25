'use strict';

(function () {

  var SIZES_PIN_MESSAGE = [50, 70];
  var MAX_RENDER_NUMBER = 5;

  var templatePin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  function renderPin(message) {
    var pinElement = templatePin.cloneNode(true);
    pinElement.style = 'left: ' + (message.location.x - SIZES_PIN_MESSAGE[0] / 2) + 'px; top: ' + (message.location.y - SIZES_PIN_MESSAGE[1]) + 'px;';
    var imgPinElement = pinElement.querySelector('img');
    imgPinElement.src = message.author.avatar;
    imgPinElement.alt = message.offer.title;
    pinElement.allData = message;

    return pinElement;
  }

  window.renderListOfPins = function (data) {
    window.utils.clearPins();
    var fragment = document.createDocumentFragment();
    var renderNumber = data.length > MAX_RENDER_NUMBER ? MAX_RENDER_NUMBER : data.length;
    for (var r = 0; r < renderNumber; r++) {
      fragment.appendChild(renderPin(data[r]));
    }
    window.dataProject.mapPins.appendChild(fragment);
  };

})();
