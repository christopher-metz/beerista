'use strict';

let beers = [];
let beerData;
let $allResults;
let verified = false;

// Check and verify logged in user
const checkForCookie = function() {
  const $xhr = $.ajax({
    method: 'GET',
    url: '/token',
    dataType: 'JSON'
  })
  .done((bool) => {
    if ($xhr.status !== 200) {
      return;
    }

    if (bool) {
      $('#login').addClass('off');
      $('#account-icon').removeClass('off');
      verified = true;
    }
  })
  .fail((err) => {
    console.log(err);
  });
};

// Get User Id
let userId;

const $xhr = $.ajax({
  method: 'GET',
  contentType: 'application/json',
  dataType: 'json',
  url: '/users'
});
$xhr.done(($xhr) => {
  userId = $xhr.id;
});
$xhr.fail(() => {
  console.log('Could not get user Id');
});

$(window).on('load', checkForCookie);

// Toggle Account Menu
const toggleAccountMenu = function() {
  $('#drop-down-container').toggleClass('off');
};

// Populate search results
const populateResults = function(beers) {
  const $results = $('#results');
  $results.empty();

  for (const beer of beers) {
    const $result = $('<div>').addClass('result');

    $result.data(beer);

    const $photo = $('<div>').addClass('photo');

    $result.append($photo);

    const $img = $('<img>').attr('src', beer.photo_url);

    $photo.append($img);

    const $info = $('<div>');

    if (verified) {
      $info.addClass('info-loggedIn');
    }
    else {
      $info.addClass('info');
    }

    const $name = $('<div>').addClass('name');

    $result.append($info);
    $info.append($name);

    const $h3 = $('<h3>').text(beer.name);
    const $h4 = $('<h4>').text(beer.brewery);
    const $h5 = $('<h5>').text(beer.style);

    $name.append($h3);
    $name.append($h4);
    $name.append($h5);

    const $stats = $('<div>').addClass('stats');

    $info.append($stats);

    const $abvP = $('<p>').text(`ABV: ${beer.abv}`).addClass('abv');
    const $ibuP = $('<p>').text(`IBU: ${beer.ibu}`).addClass('ibu');
    const $ratingP = $('<p>').text(`Rating: ${beer.source_rating}`).addClass('rating');

    $stats.append($abvP);
    $stats.append($ibuP);
    $stats.append($ratingP);

    if (verified) {
      const $star = $('<div>').addClass('star');
      const $starIcon = $('<i>').addClass('material-icons star-icon').text('grade');

      if (beer.starred) {
        $starIcon.addClass('star-gold');
      }

      $star.append($starIcon);
      $result.append($star);
    }

    $results.append($result);
  }
};

const getBeers = function(event) {
  if (event) {
    event.preventDefault();
  }

  let searchParam;

  if (window.location.search) {
    searchParam = window.QUERY_PARAMETERS.input;
  }
  else {
    searchParam = $('.search-box').val();
  }

  const $xhrBeers = $.ajax({
    method: 'GET',
    url: `/beers/?name=${searchParam}`,
    contentType: 'application/json',
    dataType: 'json'
  })
  .done((data) => {
    if ($xhrBeers.status !== 200) {
      return;
    }

    beers = data;

    if (verified) {
      const $xhr_2Beers = $.ajax({
        method: 'GET',
        url: '/stars',
        contentType: 'application/json',
        dataType: 'json'
      })
      .done((stars) => {
        if (!stars.length) {
          beers = beers.map((beer) => {
            for (const star of stars) {
              beer.beerId = star.id;
              beer.starred = false;
              if (star.source_id === beer.source_id) {
                beer.starred = true;

                return beer;
              }
            }

            return beer;
          });
        }
        populateResults(beers);
      })
      .fail(($xhr2Beers) => {
        console.log($xhr2Beers);
      });
    }
    else {
      populateResults(beers);
    }
  })
  .fail(($xhrBeers) => {
    console.log($xhrBeers)
  });
};

const checkForSearchInput = () => {
  if (window.location.search) {
    getBeers();
  }
};

const updateStar = function(event) {
  $(event.target).toggleClass('star-gold');
  $(event.target).parents('.result').data().starred = !$(event.target).parents('.result').data().starred;


  const id = $(event.target).parents('.result').data().source_id;
  const starred = $(event.target).parents('.result').data().starred;
  const starData = $(event.target).parents('.result').data();
  starData.userId = userId;

  if (starred) {
    const $xhr = $.ajax({
      method: 'POST',
      url: '/beers/star',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(starData)
    })
    .done((star) => {
      console.log(star);
    })
    .fail(() => {
      console.log('Failure');
    });

    return;
  }

  if (!starred) {
    const $xhr_2 = $.ajax({
      method: 'DELETE',
      url: '/stars',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(starData)
    })
    .done((star) => {
      console.log(star);
    })
    .fail(() => {
      console.log('Failure');
    });
  }
};

const loadBeerPage = function(event) {
  if (!verified) {
    $('#add-rating h5').text('Log In to Add Rating');
  }
  event.preventDefault();

  if (event.target.classList.contains('star-icon')) {
    updateStar(event);

    return;
  }

  $allResults = $('.result');

  const $target = $(event.target).parents('.result');

  beerData = $target.data();

  $allResults.detach();
  $target.parents('#results').addClass('off');

  $('#beer').removeClass('off');

  $('#beer-photo').attr('src', $target.find('.photo img').attr('src'));
  $('#name').text($target.find('.name h3').text());
  $('#brewery').text($target.find('.name h4').text());
  $('#style').text($target.find('.name h5').text());
  $('#abv').text($target.find('.abv').text());
  $('#ibu').text($target.find('.ibu').text());
  $('#rating').text($target.find('.rating').text());
};

const exitBeerPage = function(event) {
  event.preventDefault();

  $('#beer').addClass('off');
  $('.rating-circle').removeClass('rating-color');
  $('#results').append($allResults);
  $('#results').removeClass('off');
};

// Color Rating Option on Beer Page
const colorCircles = function() {
  $('div.rating-circle').removeClass('rating-color');
  $(this).prevAll().addClass('rating-color');
  $(this).addClass('rating-color');
};

// Grab Rating from Page Before Rating is Submitted
// Event Listener for "Add Rating"
const submitRating = function() {
  const ratingCircles = document.querySelectorAll('.rating-circle');
  let ratingCount = 0;

  if (!verified) {
    window.location.href = '/login.html';
  }

  ratingCircles.forEach((div) => {
    if (div.classList.contains('rating-color')) {
      ratingCount++;
    }
  });

  if (ratingCount === 0) {
    return;
  }

  beerData.user_rating = ratingCount;
  beerData.user_id= userId;

  const requestContent = JSON.stringify(beerData);

  const $xhr_2 = $.ajax({
    method: 'POST',
    url: '/beers/rating',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(beerData)
  })
  .done((data) => {
    window.location.href = '/profile.html';
  })
  .fail(() => {
    console.log('Failure');
  });
};

const clearSearchInput = (event) => {
  event.preventDefault();

  if (window.location.search) {
    window.location.search = '';
  }
};

const logout = () => {
  const $xhr = $.ajax({
    method: 'DELETE',
    url: '/token',
    dataType: 'JSON'
  })
  .done((bool) => {
    if ($xhr.status !== 200) {
      return;
    }

    if (bool) {
      $('#login').removeClass('off');
      $('#account-icon').addClass('off');
    }

    window.location.href = '/login.html';
  })
  .fail((err) => {
    console.log(err);
  });
};

(function() {
  $('#account-icon').on('click', toggleAccountMenu);

  // Navigate to other pages via Account Menu
  const findPeople = $('#find-people');
  const myBeers = $('#my-beers');
  const $logout = $('#log-out');

  findPeople.on('click', () => { window.location.href = '/users.html'; });
  myBeers.on('click', () => { window.location.href = '/profile.html'; });
  $logout.on('click', logout);

  // const menuOptions = $('#log-out');

  window.QUERY_PARAMETERS = {};

  if (window.location.search) {
    window.location.search.substr(1).split('&').forEach((paramStr) => {
      const param = paramStr.split('=');

      window.QUERY_PARAMETERS[param[0]] = param[1];
    });
  }

  $(window).on('load', checkForSearchInput);

  const $search = $('#search-btn');
  const $searchInput = $('.search-box');

  $searchInput.focus(clearSearchInput);
  $searchInput.on('input', getBeers);
  $('form').submit(getBeers);
  $('#search-btn').on('click', getBeers);

  // Exit individual beer "pop-up"
  const $results = $('#results');

  $results.on('click', '.result', loadBeerPage);

  const $exit = $('i');

  $exit.on('click', exitBeerPage);

  $('div.rating-circle').on('click', colorCircles);

  $('#add-rating').on('click', submitRating);
})();
