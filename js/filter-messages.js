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

    function havePrice(value) {
      if (value < 10000) {
        return 'low';
      } else if (value >= 50000) {
        return 'high';
      } else {
        return 'middle';
      }
    }

    function chooseMessages(data) {
      var filteredArray = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].offer.type !== selectHousingType.value && selectHousingType.value !== 'any') {
          continue;
        }
        if (havePrice(data[i].offer.price) !== selectHousingPrice.value && selectHousingPrice.value !== 'any') {
          continue;
        }
        if (String(data[i].offer.rooms) !== selectHousingRooms.value && selectHousingRooms.value !== 'any') {
          continue;
        }
        if (String(data[i].offer.guests) !== selectHousingGuest.value && selectHousingGuest.value !== 'any') {
          continue;
        }
        var filterCheckBox = true;
        for (var j = 0; j < listMapCheckbox.length; j++) {
          if (listMapCheckbox[j].checked && !data[i].offer.features.includes(listMapCheckbox[j].value)) {
            filterCheckBox = false;
            break;
          }
        }
        if (!filterCheckBox) {
          continue;
        }

        filteredArray.push(data[i]);

        if (filteredArray.length === 5) {
          break;
        }
      }
      return filteredArray;
    }

    var messagesForFilter = chooseMessages(window.main.serverMessages);

    window.debounce(function () {
      window.renderListOfPins(messagesForFilter);
    });

  });

})();
