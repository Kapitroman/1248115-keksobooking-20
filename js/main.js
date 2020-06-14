'use strict';

var NUMBER_ANNOUNCEMENTS = 8;
var TITLE = [
  'Уютное гнездышко для молодоженов',
  'Маленькая квартирка рядом с парком',
  'Небольшая лавочка в парке',
  'Императорский дворец в центре Токио',
  'Милейший чердачок',
  'Наркоманский притон',
  'Чёткая хата',
  'Стандартная квартира в центре',
  'Тихая квартирка недалеко от метро',
  'Милое гнездышко для фанатов Анимэ'
];
var PRICE = [42000, 30000, 100, 6000000, 10000, 5000, 9000, 6000, 50000, 90000];
var TYPE_ACCOMODATION = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [3, 1, 0, 35, 1, 3, 2, 3, 1, 1];
var GUESTS = [6, 1, 0, 93, 2, 6, 3, 5, 3, 2];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = [
  'Великолепный таун-хауз в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.',
  'Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.',
  'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
  'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.',
  'Маленькая квартирка на чердаке. Для самых не требовательных.',
  'У нас есть всё! Шприцы, интернет, кофе. Для всех кто знает толк в отдыхе. Полицию просим не беспокоить.',
  'У нас тут все ништяк. Ларек за углом. Шава 24 часа. Приезжайте! Интернетов нет!',
  'Тут красиво, светло и уютно. Есть где разместиться компании из 5 человек. Кофе и печеньки бесплатно.',
  'Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.',
  'Азиатов просьба не беспокоить.'
];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_X = [100, 1040];
var LOCATION_Y = [130, 630];
var SIZES_PIN_START = [62, 31];
var SIZES_PIN = [62, 84];
var SIZES_PIN_MESSAGE = [50, 70];
var TYPE_FLAT = {
  'flat': ['Квартира', 1000],
  'bungalo': ['Бунгало', 0],
  'palace': ['Дворец', 10000],
  'house': ['Дом', 5000]
};
var ROOMS_DISABLED_GUEST = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};
var MESSAGE_CAPACITY = {
  '1': 'Вы можете выбрать для 1 гостя',
  '2': 'Вы можете выбрать для 1 гостя или для 2 гостей',
  '3': 'Вы можете выбрать для 1 гостя, для 2 или 3 гостей',
  '100': 'Вы можете выбрать только нет гостей'
};

function randomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function getAnnouncements() {
  var announcements = [];
  for (var i = 0; i < NUMBER_ANNOUNCEMENTS; i++) {
    var locationX = randomInteger(LOCATION_X[0], LOCATION_X[1]);
    var locationY = randomInteger(LOCATION_Y[0], LOCATION_Y[1]);
    var featuresLength = randomIndex(FEATURES) + 1;
    var photosLength = randomIndex(PHOTOS) + 1;
    announcements.push({
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': TITLE[randomIndex(TITLE)],
        'address': locationX + ', ' + locationY,
        'price': PRICE[randomIndex(PRICE)],
        'type': TYPE_ACCOMODATION[randomIndex(TYPE_ACCOMODATION)],
        'rooms': ROOMS[randomIndex(ROOMS)],
        'guests': GUESTS[randomIndex(GUESTS)],
        'checkin': CHECK_TIME[randomIndex(CHECK_TIME)],
        'checkout': CHECK_TIME[randomIndex(CHECK_TIME)],
        'features': FEATURES.slice(0, featuresLength),
        'description': DESCRIPTION[randomIndex(DESCRIPTION)],
        'photos': PHOTOS.slice(0, photosLength)
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    });
  }
  return announcements;
}

var messages = getAnnouncements();

var map = document.querySelector('.map');
var mapPinMain = map.querySelector('.map__pin--main');
var mapPins = document.querySelector('.map__pins');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var formAdForm = document.querySelector('.ad-form');
var formSelects = document.querySelectorAll('select');
var formFieldsets = document.querySelectorAll('fieldset');

function setDisabled(elem) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].setAttribute('disabled', '');
  }
}

setDisabled(formSelects);
setDisabled(formFieldsets);

var inputAddress = formAdForm.querySelector('input[name="address"]');
var selectFlatType = formAdForm.querySelector('select[name="type"]');
var inputPrice = formAdForm.querySelector('input[name="price"]');
var selectRooms = formAdForm.querySelector('select[name="rooms"]');
var selectCapacity = formAdForm.querySelector('select[name="capacity"]');
var selectTimeIn = formAdForm.querySelector('select[name="timein"]');
var selectTimeOut = formAdForm.querySelector('select[name="timeout"]');

function getAddressForm(elem, pin) {
  var xElem = elem.style.left;
  var yElem = elem.style.top;
  return Math.round(parseInt(xElem, 10) + pin[0] / 2) + ', ' + Math.round(parseInt(yElem, 10) + pin[1]);
}

inputAddress.value = getAddressForm(mapPinMain, SIZES_PIN_START);

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0 && map.classList.contains('map--faded')) {
    getActivation();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter' && map.classList.contains('map--faded')) {
    getActivation();
  }
});

function removeDisabled(elem) {
  for (var k = 0; k < elem.length; k++) {
    elem[k].removeAttribute('disabled');
  }
}

function getActivation() {
  map.classList.remove('map--faded');
  formAdForm.classList.remove('ad-form--disabled');
  renderListOfPins();
  removeDisabled(formSelects);
  removeDisabled(formFieldsets);
  inputAddress.value = getAddressForm(mapPinMain, SIZES_PIN);
  for (var n = 0; n < selectCapacity.options.length; n++) {
    if (selectCapacity.options[n].value === '1') {
      selectCapacity.options[n].selected = true;
    } else {
      selectCapacity.options[n].disabled = true;
    }
  }
  getPrice();
}

function getPrice() {
  inputPrice.min = TYPE_FLAT[selectFlatType.value][1];
  inputPrice.placeholder = TYPE_FLAT[selectFlatType.value][1];
}

function getMessagePrice() {
  if (inputPrice.value < inputPrice.min) {
    inputPrice.setCustomValidity('для данного типа жилья \nминимальная цена должна быть выше');
  } else {
    inputPrice.setCustomValidity('');
  }
}

selectFlatType.addEventListener('change', function () {
  getPrice();
  getMessagePrice();
});

inputPrice.addEventListener('change', function () {
  getMessagePrice();
});

function getMessageCapacity() {
  if (ROOMS_DISABLED_GUEST[selectRooms.value].includes(selectCapacity.value)) {
    selectCapacity.setCustomValidity('');
  } else {
    selectCapacity.setCustomValidity(MESSAGE_CAPACITY[selectRooms.value]);
  }
}

selectRooms.addEventListener('change', function () {
  for (var p = 0; p < selectCapacity.options.length; p++) {
    if (ROOMS_DISABLED_GUEST[selectRooms.value].includes(selectCapacity.options[p].value)) {
      selectCapacity[p].disabled = false;
    } else {
      selectCapacity[p].disabled = true;
    }
  }
  getMessageCapacity();
});

selectCapacity.addEventListener('change', function () {
  getMessageCapacity();
});

selectTimeIn.addEventListener('change', function () {
  selectTimeOut.value = selectTimeIn.value;
});

selectTimeOut.addEventListener('change', function () {
  selectTimeIn.value = selectTimeOut.value;
});

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

function renderListOfPins() {
  var fragment = document.createDocumentFragment();
  for (var r = 0; r < messages.length; r++) {
    fragment.appendChild(renderPin(messages[r]));
  }
  mapPins.appendChild(fragment);
}

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
  map.removeChild(map.querySelector('.popup'));
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
    map.removeChild(mapFiltersContainer.previousElementSibling);
  }
  for (var i = 0; i < messages.length; i++) {
    if (sourceImg === messages[i].author.avatar) {
      var openCard = createCard(messages[i]);
      map.insertBefore(openCard, mapFiltersContainer);
    }
  }

  var popupClose = openCard.querySelector('.popup__close');
  popupClose.addEventListener('click', handlerClickClose);
  document.addEventListener('keydown', handlerPressEsc);
}

mapPins.addEventListener('click', openCardMessage);

var templateCard = document.querySelector('#card')
  .content
  .querySelector('.map__card');

function getTextContent(element, value) {
  element.textContent = value;
}

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

function createCard(message) {
  var cardElement = templateCard.cloneNode(true);

  var popupTitle = cardElement.querySelector('.popup__title');
  getTextContent(popupTitle, message.offer.title);

  var popupTextAddress = cardElement.querySelector('.popup__text--address');
  getTextContent(popupTextAddress, message.offer.address);

  var popupTextPrice = cardElement.querySelector('.popup__text--price');
  getTextContent(popupTextPrice, message.offer.price + '₽/ночь');

  var popupType = cardElement.querySelector('.popup__type');
  getTextContent(popupType, TYPE_FLAT[message.offer.type][0]);

  var popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
  getTextContent(popupTextCapacity, message.offer.rooms + ' ' + getRoomsString(message.offer.rooms) + ' для ' + message.offer.guests + ' ' + getGuestsString(message.offer.guests));

  var popupTextTime = cardElement.querySelector('.popup__text--time');
  getTextContent(popupTextTime, 'Заезд после ' + message.offer.checkin + ' выезд до ' + message.offer.checkout);

  var featuresList = cardElement.querySelectorAll('.popup__feature');
  for (var j = 0; j < featuresList.length; j++) {
    if (message.offer.features[j]) {
      getTextContent(featuresList[j], message.offer.features[j]);
    } else {
      featuresList[j].style = 'display: none;';
    }
  }

  var popupDescription = cardElement.querySelector('.popup__description');
  getTextContent(popupDescription, message.offer.description);

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
}
