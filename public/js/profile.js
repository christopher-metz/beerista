(function() {
  'use strict';

// Toggle Account Menu
  const toggleAccountMenu = function() {
    $('#drop-down-container').toggleClass('off');
  }

  $('#account-icon').on('click', toggleAccountMenu);

  // Navigate to other pages via Account Menu
  const myFollows = $('#my-follows');
  const myBeers = $('#my-beers');
  // const settings = $('#settings');

  myFollows.on('click', () => { window.location.href = '/followers.html' });
  myBeers.on('click', () => { window.location.href = '/profile.html' });

  // const menuOptions = $('#log-out');
/*-------------------------------------------------*/
// Populate Results
  const populateResults = function(ratings) {
    const $beerDisplay = $('#beer-display');
    $beerDisplay.empty();

    for (const rating of ratings) {
      const $result = $('<div>').addClass('result');
      const $photo = $('<div>').addClass('photo');

      $result.append($photo);

      const $img = $('<img>').attr('src', rating.photo_url);

      $photo.append($img);

      const $info = $('<div>').addClass('info');
      const $name = $('<div>').addClass('name');

      $result.append($info);
      $info.append($name);

      const $h3 = $('<h3>').text(rating.name);
      const $h4 = $('<h4>').text(rating.brewery);
      const $h5 = $('<h5>').text(rating.city);

      $name.append($h3);
      $name.append($h4);
      $name.append($h5);

      const $stats = $('<div>').addClass('stats');

      $info.append($stats);

      const $abvP = $('<p>').text(`ABV: ${rating.abv}`).addClass('abv');
      const $ibuP = $('<p>').text(`IBU: ${rating.ibu}`).addClass('ibu');
      const $ratingP = $('<p>').text(`Rating: ${rating.rating}`).addClass('rating');

      $stats.append($abvP);
      $stats.append($ibuP);
      $stats.append($ratingP);

      $beerDisplay.append($result);
    };
  };

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
  window.QUERY_PARAMETERS = {};

  if (window.location.search) {
    window.location.search.substr(1).split('&').forEach((paramStr) => {
      const param = paramStr.split('=');

      window.QUERY_PARAMETERS[param[0]] = param[1];
    });
  }

  if (!window.QUERY_PARAMETERS.userId) {
    const $xhr = $.ajax({
      method: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      url: '/users'
    });
    $xhr.done(($xhr) => {
      userId = $xhr.id;
      $('#user-name').text(`${$xhr.firstName} ${$xhr.lastName}`)
    });
    $xhr.fail(() => {
      window.location.href = '/login.html';
    });

    const $xhr_2 = $.ajax({
      method: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      url: '/ratings'
    })
    .done((ratings) => {
      populateResults(ratings);
    })
    .fail(() => {
      window.location.href = '/login.html';
    });
  }
  else {
    const equalI = window.location.search.indexOf('=');
    const followerId = Number.parseInt(window.location.search.slice(equalI));
    const $xhr = $.ajax({
      method: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      url: `/users/${window.QUERY_PARAMETERS.userId}`
    });
    $xhr.done(($xhr) => {
      userId = $xhr.id;
      $('#user-name').text(`${$xhr.firstName} ${$xhr.lastName}`)
    });
    $xhr.fail(() => {
      window.location.href = '/login.html';
    });

    const $xhr_2 = $.ajax({
      method: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      url: `/ratings/${window.QUERY_PARAMETERS.userId}`
    })
    .done((ratings) => {
      populateResults(ratings);
    })
    .fail(() => {
      window.location.href = '/login.html';
    });
  }
/*-------------------------------------------------*/
})();
