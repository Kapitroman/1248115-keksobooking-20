'use strict';

(function () {

  var SIZES_PIN_MESSAGE = [50, 70];

  var templatePin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  function renderPin(message) {
    var pinElement = templatePin.cloneNode(true);
    pinElement.style = 'left: ' + (message.location.x - SIZES_PIN_MESSAGE[0] / 2) + 'px; top: ' + (message.location.y - SIZES_PIN_MESSAGE[1]) + 'px;';
    var imgPinElement = pinElement.querySelector('img');
    imgPinElement.src = message.author.avatar;
    imgPinElement.alt = message.offer.title;

    return pinElement;
  }

  window.renderListOfPins = function () {
    var fragment = document.createDocumentFragment();
    for (var r = 0; r < window.dataServer.length; r++) {
      fragment.appendChild(renderPin(window.dataServer[r]));
    }
    window.dataProject.mapPins.appendChild(fragment);
  };

})();
