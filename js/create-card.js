'use strict';

(function () {

  var templateCard = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  function getRoomsString(number) {
    if (number === 0 || number === 35) {
      return 'комнат';
    }
    if (number === 1) {
      return 'комната';
    }
    return 'комнаты';
  }

  function getGuestsString(number) {
    if (number === 1) {
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
    window.utils.getTextContent(popupType, window.dataProject.typeFlat[message.offer.type][0]);

    var popupTextCapacity = cardOffer.querySelector('.popup__text--capacity');
    window.utils.getTextContent(popupTextCapacity, message.offer.rooms + ' ' + getRoomsString(message.offer.rooms) + ' для ' + message.offer.guests + ' ' + getGuestsString(message.offer.guests));

    var popupTextTime = cardOffer.querySelector('.popup__text--time');
    window.utils.getTextContent(popupTextTime, 'Заезд после ' + message.offer.checkin + ' выезд до ' + message.offer.checkout);

    var featuresList = cardOffer.querySelectorAll('.popup__feature');
    Array.from(featuresList).forEach(function (itemFeaturesList) {
      message.offer.features.forEach(function (itemOfferFeatures) {
        if (itemFeaturesList.classList.contains('popup__feature--' + itemOfferFeatures)) {
          window.utils.getTextContent(itemFeaturesList, itemOfferFeatures);
        }
      });
      if (!itemFeaturesList.textContent) {
        itemFeaturesList.style = 'display: none;';
      }
    });

    var popupDescription = cardOffer.querySelector('.popup__description');
    window.utils.getTextContent(popupDescription, message.offer.description);

    var popupPhotos = cardOffer.querySelector('.popup__photos');
    if (!message.offer.photos.length) {
      popupPhotos.style = 'display: none;';
    } else {
      var popupPhoto = cardOffer.querySelector('.popup__photo');
      var fragment = document.createDocumentFragment();
      message.offer.photos.forEach(function (item) {
        var tempPhoto = popupPhoto.cloneNode(true);
        tempPhoto.src = item;
        fragment.appendChild(tempPhoto);
      });
      popupPhotos.insertBefore(fragment, popupPhoto);
      popupPhotos.removeChild(popupPhoto);
    }

    var popupAvatar = cardOffer.querySelector('.popup__avatar');
    popupAvatar.src = message.author.avatar ? message.author.avatar : 'img/avatars/default.png';

    return cardOffer;
  };

})();
