'use strict';

(function () {

  var typeFlat = {
    'flat': ['Квартира', 1000],
    'bungalo': ['Бунгало', 0],
    'palace': ['Дворец', 10000],
    'house': ['Дом', 5000]
  };

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var formAdForm = document.querySelector('.ad-form');
  var selectFlatType = formAdForm.querySelector('select[name="type"]');
  var inputPrice = formAdForm.querySelector('input[name="price"]');
  var selectRooms = formAdForm.querySelector('select[name="rooms"]');
  var selectCapacity = formAdForm.querySelector('select[name="capacity"]');

  window.dataProject = {
    typeFlat: typeFlat,
    map: map,
    mapPins: mapPins,
    formAdForm: formAdForm,
    selectFlatType: selectFlatType,
    inputPrice: inputPrice,
    selectRooms: selectRooms,
    selectCapacity: selectCapacity
  };

})();
