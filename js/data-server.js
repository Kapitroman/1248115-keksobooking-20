'use strict';

(function () {

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

  window.dataServer = getAnnouncements();

})();
