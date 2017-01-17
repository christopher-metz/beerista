(function() {
  'use strict';

/*-------------------------------------------------*/
// Filter options
  const toggleFilter = function() {
    $('.filter-menu-container').toggleClass('off');
  }

  const filter = $('#filter-btn');

  filter.on('click', toggleFilter);
/*-------------------------------------------------*/
// Load user info
  let userId;

  const $xhr = $.ajax({
    method: 'GET',
    contentType: 'application/json',
    dataType: 'json',
    url: '/users'
  });
  $xhr.done(($xhr) => {
    userId = JSON.parse($xhr)[0].id;
  });
  $xhr.fail(() => {
    window.location.href = '/login.html';
  });

  $.getJSON('/ratings')
    .done((ratings) => {
      
    })
    .fail(() => {
      window.location.href = '/login.html';
    });
/*-------------------------------------------------*/
})();
