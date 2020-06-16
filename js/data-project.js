'use strict';

(function () {

  var TYPE_FLAT = {
    'flat': ['Квартира', 1000],
    'bungalo': ['Бунгало', 0],
    'palace': ['Дворец', 10000],
    'house': ['Дом', 5000]
  };

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var formAdForm = document.querySelector('.ad-form');
  var formSelects = document.querySelectorAll('select');
  var formFieldsets = document.querySelectorAll('fieldset');
  var inputAddress = formAdForm.querySelector('input[name="address"]');
  var selectFlatType = formAdForm.querySelector('select[name="type"]');
  var inputPrice = formAdForm.querySelector('input[name="price"]');
  var selectRooms = formAdForm.querySelector('select[name="rooms"]');
  var selectCapacity = formAdForm.querySelector('select[name="capacity"]');

  window.dataProject = {
    TYPE_FLAT: TYPE_FLAT,
    map: map,
    mapPinMain: mapPinMain,
    mapPins: mapPins,
    formAdForm: formAdForm,
    formSelects: formSelects,
    formFieldsets: formFieldsets,
    inputAddress: inputAddress,
    selectFlatType: selectFlatType,
    inputPrice: inputPrice,
    selectRooms: selectRooms,
    selectCapacity: selectCapacity
  };

})();
