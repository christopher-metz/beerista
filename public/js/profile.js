(function() {
  'use strict';

  const toggleFilter = function() {
    $('.filter-menu-container').toggleClass('off');
  }

  const filter = $('#filter-btn');

  filter.on('click', toggleFilter);

  // $.getJSON('/ratings')
  //   .done((ratings) => {
  //     // fill out profile page
  //
  //   })
  //   .fail(() => {
  //     window.location.href = '/login.html';
  //   });
})();
