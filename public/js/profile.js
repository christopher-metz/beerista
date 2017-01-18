'use strict';

let isRatings = true;

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

    $stats.append($abvP);
    $stats.append($ibuP);

    if (isRatings) {
      const $ratingP = $('<p>').text(`Rating: ${rating.rating}`).addClass('rating');
      $stats.append($ratingP);
    }

    $beerDisplay.append($result);
  };
};

const populateRatings = () => {
  let userId;

  $('#rated-beers').addClass('shadow');
  $('#starred-beers').removeClass('shadow');

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
};

const populateStars = () => {
  let userId;

  $('#starred-beers').addClass('shadow');
  $('#rated-beers').removeClass('shadow');

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
      url: '/stars'
    })
    .done((stars) => {
      populateResults(stars);
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
      url: `/stars/${window.QUERY_PARAMETERS.userId}`
    })
    .done((stars) => {
      populateResults(stars);
    })
    .fail(() => {
      window.location.href = '/login.html';
    });
  }
};

const handleStarsOrRating = (event) => {
  if (event.target.id === 'rated-beers') {
    isRatings = true;
    populateRatings();
  }
  else {
    isRatings = false;
    populateStars();
  }
};

const toggleAccountMenu = function() {
  $('#drop-down-container').toggleClass('off');
};

const toggleFilter = function() {
  $('.filter-menu-container').toggleClass('off');
};

const handleGeneralSearch = (event) => {
  event.preventDefault();
  const searchBeer = $('input').val();
  window.location.href = `/search.html?input=${searchBeer}`;
};

(function() {
  // Toggle Account Menu
  $('#account-icon').on('click', toggleAccountMenu);

  // Navigate to other pages via Account Menu
  const myFollows = $('#my-follows');
  const myBeers = $('#my-beers');
  // const settings = $('#settings');

  myFollows.on('click', () => { window.location.href = '/followers.html' });
  myBeers.on('click', () => { window.location.href = '/profile.html' });

  // const menuOptions = $('#log-out');
/*-------------------------------------------------*/
  populateRatings();

  $('#profile-menu').on('click', handleStarsOrRating);

// Filter options
  const $filter = $('#filter-btn');

  $filter.on('click', toggleFilter);

  const $generalSearch = $('#general-search');
  // $generalSearch.on('submit', handleGeneralSearch);
  // console.log("Hi mom");
  $generalSearch.submit(handleGeneralSearch);
})();
