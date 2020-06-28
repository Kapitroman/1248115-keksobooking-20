'use strict';

(function () {

  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var selectHousingType = mapFiltersContainer.querySelector('select[name="housing-type"]');
  var selectHousingPrice = mapFiltersContainer.querySelector('select[name="housing-price"]');
  var selectHousingRooms = mapFiltersContainer.querySelector('select[name="housing-rooms"]');
  var selectHousingGuest = mapFiltersContainer.querySelector('select[name="housing-guests"]');
  var listMapCheckbox = mapFiltersContainer.querySelectorAll('.map__checkbox');

  mapFiltersContainer.addEventListener('change', function () {
    window.main.closeCardMessage();

    var messagesForFilter = window.main.serverMessages;

    function havePrice(val) {
      if (val < 10000) {
        return 'low';
      } else if (val >= 50000) {
        return 'high';
      } else {
        return 'middle';
      }
    }

    function chooseSelect(element) {
      var iterateArr = [];
      if (element.value !== 'any') {
        for (var i = 0; i < messagesForFilter.length; i++) {
          if (element === selectHousingType) {
            if (messagesForFilter[i].offer.type === selectHousingType.value) {
              iterateArr.push(messagesForFilter[i]);
            }
          }
          if (element === selectHousingPrice) {
            if (havePrice(messagesForFilter[i].offer.price) === selectHousingPrice.value) {
              iterateArr.push(messagesForFilter[i]);
            }
          }
          if (element === selectHousingRooms) {
            if (messagesForFilter[i].offer.rooms === Number(selectHousingRooms.value)) {
              iterateArr.push(messagesForFilter[i]);
            }
          }
          if (element === selectHousingGuest) {
            if (messagesForFilter[i].offer.guests === Number(selectHousingGuest.value)) {
              iterateArr.push(messagesForFilter[i]);
            }
          }
          if (iterateArr.length === 5) {
            break;
          }
        }
        return iterateArr;
      }
      return messagesForFilter;
    }

    function chooseCheckbox(element) {
      var iterateArr = [];
      if (element.checked) {
        for (var i = 0; i < messagesForFilter.length; i++) {
          if (messagesForFilter[i].offer.features.includes(element.value)) {
            iterateArr.push(messagesForFilter[i]);
          }
          if (iterateArr.length === 5) {
            break;
          }
        }
        return iterateArr;
      }
      return messagesForFilter;
    }

    messagesForFilter = chooseSelect(selectHousingType);
    messagesForFilter = chooseSelect(selectHousingPrice);
    messagesForFilter = chooseSelect(selectHousingRooms);
    messagesForFilter = chooseSelect(selectHousingGuest);

    for (var v = 0; v < listMapCheckbox.length; v++) {
      messagesForFilter = chooseCheckbox(listMapCheckbox[v]);
    }

    window.debounce(function () {
      window.renderListOfPins(messagesForFilter);
    });

  });

})();
