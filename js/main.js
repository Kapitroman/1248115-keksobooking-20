'use strict';

var NUMBER_ANNOUNCEMENTS = 8;
var TYPE_ACCOMODATION = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_X = [100, 1040];
var LOCATION_Y = [130, 630];
var SIZES_PIN = [50, 70];

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
    announcements.push({
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'Уютное гнездышко для молодоженов',
        'address': location.x + ', ' + location.y,
        'price': 3000,
        'type': TYPE_ACCOMODATION[randomIndex(TYPE_ACCOMODATION)],
        'rooms': 3,
        'guests': 9,
        'checkin': CHECK_TIME[randomIndex(CHECK_TIME)],
        'checkout': CHECK_TIME[randomIndex(CHECK_TIME)],
        'features': FEATURES.length = randomIndex(FEATURES) + 1,
        'description': 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
        'photos': PHOTOS.length = randomIndex(PHOTOS) + 1
      },
      'location': {
        'x': randomInteger(LOCATION_X[0], LOCATION_X[1]),
        'y': randomInteger(LOCATION_Y[0], LOCATION_Y[1])
      }
    });
  }
  return announcements;
}

var messages = getAnnouncements();

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var templatePin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

function renderPin(message) {
  var pinElement = templatePin.cloneNode(true);
  pinElement.style = 'left: ' + (message.location.x - SIZES_PIN[0] / 2) + 'px; top: ' + (message.location.y - SIZES_PIN[1]) + 'px;';
  var imgPinElement = pinElement.querySelector('img');
  imgPinElement.src = message.author.avatar;
  imgPinElement.alt = message.offer.title;

  return pinElement;
}

var mapPins = document.querySelector('.map__pins');

function renderListOfPins() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < messages.length; i++) {
    fragment.appendChild(renderPin(messages[i]));
  }
  mapPins.appendChild(fragment);
}

renderListOfPins();
