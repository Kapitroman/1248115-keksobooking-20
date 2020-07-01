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

    function transformForEqual(item, typeOffer) {
      if (typeOffer === 'type') {
        return item.offer[typeOffer];
      }
      if (typeOffer === 'rooms' || typeOffer === 'guests') {
        return String(item.offer[typeOffer]);
      }
      if (item.offer[typeOffer] < 10000) {
        return 'low';
      } else if (item.offer[typeOffer] >= 50000) {
        return 'high';
      } else {
        return 'middle';
      }
    }

    function chooseMessages(element, typeOffer) {
      var iterateArr = [];
      if (element.checked || (element.value !== 'any' && typeOffer !== 'features')) {
        for (var i = 0; i < messagesForFilter.length; i++) {
          if (typeOffer === 'features' && messagesForFilter[i].offer.features.includes(element.value)) {
            iterateArr.push(messagesForFilter[i]);
          }
          if (typeOffer !== 'features' && transformForEqual(messagesForFilter[i], typeOffer) === element.value) {
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

    messagesForFilter = chooseMessages(selectHousingType, 'type');
    messagesForFilter = chooseMessages(selectHousingPrice, 'price');
    messagesForFilter = chooseMessages(selectHousingRooms, 'rooms');
    messagesForFilter = chooseMessages(selectHousingGuest, 'guests');

    for (var v = 0; v < listMapCheckbox.length; v++) {
      messagesForFilter = chooseMessages(listMapCheckbox[v], 'features');
    }

    window.debounce(function () {
      window.renderListOfPins(messagesForFilter);
    });

  });

})();
