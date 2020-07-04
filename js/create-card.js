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
    var cardOffer = templateCard.cloneNode(true);

    var popupTitle = cardOffer.querySelector('.popup__title');
    window.utils.getTextContent(popupTitle, message.offer.title);

    var popupTextAddress = cardOffer.querySelector('.popup__text--address');
    window.utils.getTextContent(popupTextAddress, message.offer.address);

    var popupTextPrice = cardOffer.querySelector('.popup__text--price');
    window.utils.getTextContent(popupTextPrice, message.offer.price + '₽/ночь');

    var popupType = cardOffer.querySelector('.popup__type');
    window.utils.getTextContent(popupType, window.dataProject.TYPE_FLAT[message.offer.type][0]);

    var popupTextCapacity = cardOffer.querySelector('.popup__text--capacity');
    window.utils.getTextContent(popupTextCapacity, message.offer.rooms + ' ' + getRoomsString(message.offer.rooms) + ' для ' + message.offer.guests + ' ' + getGuestsString(message.offer.guests));

    var popupTextTime = cardOffer.querySelector('.popup__text--time');
    window.utils.getTextContent(popupTextTime, 'Заезд после ' + message.offer.checkin + ' выезд до ' + message.offer.checkout);

    var featuresList = cardOffer.querySelectorAll('.popup__feature');
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

    var popupDescription = cardOffer.querySelector('.popup__description');
    window.utils.getTextContent(popupDescription, message.offer.description);

    var popupPhotos = cardOffer.querySelector('.popup__photos');
    if (message.offer.photos.length === 0) {
      popupPhotos.style = 'display: none;';
    } else {
      var popupPhoto = cardOffer.querySelector('.popup__photo');
      for (var k = 0; k < message.offer.photos.length; k++) {
        var tempPhoto = popupPhoto.cloneNode(true);
        tempPhoto.src = message.offer.photos[k];
        popupPhotos.insertBefore(tempPhoto, popupPhoto);
      }
      popupPhotos.removeChild(popupPhoto);
    }

    var popupAvatar = cardOffer.querySelector('.popup__avatar');
    if (message.author.avatar) {
      popupAvatar.src = message.author.avatar;
    } else {
      popupAvatar.src = 'img/avatars/default.png';
    }

    return cardOffer;
  };

})();
