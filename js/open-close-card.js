'use strict';

(function () {

  window.dataProject.mapPins.addEventListener('click', openCardMessage);

  var mapFiltersContainer = document.querySelector('.map__filters-container');

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
    window.dataProject.map.removeChild(window.dataProject.map.querySelector('.popup'));
    document.removeEventListener('keydown', handlerPressEsc);
  }

  function openCardMessage(evt) {
    var targetPin = evt.target.closest('.map__pin');
    if (!targetPin) {
      return;
    }
    if (targetPin.classList.contains('map__pin--main')) {
      return;
    }
    var sourceImg = targetPin.firstElementChild.getAttribute('src');
    if (mapFiltersContainer.previousElementSibling.classList.contains('popup')) {
      window.dataProject.map.removeChild(mapFiltersContainer.previousElementSibling);
    }
    for (var i = 0; i < window.dataServer.length; i++) {
      if (sourceImg === window.dataServer[i].author.avatar) {
        var openCard = window.createCard(window.dataServer[i]);
        window.dataProject.map.insertBefore(openCard, mapFiltersContainer);
      }
    }

    var popupClose = openCard.querySelector('.popup__close');
    popupClose.addEventListener('click', handlerClickClose);
    document.addEventListener('keydown', handlerPressEsc);
  }

})();