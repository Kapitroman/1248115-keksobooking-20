'use strict';

(function () {

  var templateCard = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  function getRoomsString(num) {
    if (num === 0 || num === 35) {
      return 'комнат';
    }
    if (num === 1) {
      return 'комната';
    }
    return 'комнаты';
  }

  function getGuestsString(num) {
    if (num === 1) {
      return 'гостя';
    }
    return 'гостей';
  }

  window.createCard = function (message) {
    var cardElement = templateCard.cloneNode(true);

    var popupTitle = cardElement.querySelector('.popup__title');
    window.utils.getTextContent(popupTitle, message.offer.title);

    var popupTextAddress = cardElement.querySelector('.popup__text--address');
    window.utils.getTextContent(popupTextAddress, message.offer.address);

    var popupTextPrice = cardElement.querySelector('.popup__text--price');
    window.utils.getTextContent(popupTextPrice, message.offer.price + '₽/ночь');

    var popupType = cardElement.querySelector('.popup__type');
    window.utils.getTextContent(popupType, window.dataProject.TYPE_FLAT[message.offer.type][0]);

    var popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
    window.utils.getTextContent(popupTextCapacity, message.offer.rooms + ' ' + getRoomsString(message.offer.rooms) + ' для ' + message.offer.guests + ' ' + getGuestsString(message.offer.guests));

    var popupTextTime = cardElement.querySelector('.popup__text--time');
    window.utils.getTextContent(popupTextTime, 'Заезд после ' + message.offer.checkin + ' выезд до ' + message.offer.checkout);

    var featuresList = cardElement.querySelectorAll('.popup__feature');
    for (var j = 0; j < featuresList.length; j++) {
      for (var z = 0; z < message.offer.features.length; z++) {
        if (featuresList[j].classList.contains('popup__feature--' + message.offer.features[z])) {
          window.utils.getTextContent(featuresList[j], message.offer.features[z]);
        }
      }
      if (!featuresList[j].textContent) {
        featuresList[j].style = 'display: none;';
      }
    }

    var popupDescription = cardElement.querySelector('.popup__description');
    window.utils.getTextContent(popupDescription, message.offer.description);

    var popupPhotos = cardElement.querySelector('.popup__photos');
    var popupPhoto = cardElement.querySelector('.popup__photo');
    for (var k = 0; k < message.offer.photos.length; k++) {
      var tempPhoto = popupPhoto.cloneNode(true);
      tempPhoto.src = message.offer.photos[k];
      popupPhotos.insertBefore(tempPhoto, popupPhoto);
    }
    popupPhotos.removeChild(popupPhoto);

    var popupAvatar = cardElement.querySelector('.popup__avatar');
    popupAvatar.src = message.author.avatar;

    return cardElement;
  };

})();
