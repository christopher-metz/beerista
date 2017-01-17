(function() {
  'use strict';

  $.getJSON('/ratings')
    .done((ratings) => {
      // fill out profile page
      }
    })
    .fail(() => {
      window.location.href = '/login.html';
    });
})();
