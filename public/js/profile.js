(function() {

'use strict';

let isRatings = true;
let beers;

const populateResults = function(ratings) {
  const $beerDisplay = $('#beer-display');

  $beerDisplay.empty();
  // console.log(ratings);

  beers = ratings;

  for (const rating of ratings) {
    // console.log(rating);
    const $result = $('<div>').addClass('result');

    $result.data(rating);

    const $photo = $('<div>').addClass('photo');

    $result.append($photo);

    const $img = $('<img>').attr('src', rating.photo_url);

    $photo.append($img);

    const $info = $('<div>').addClass('info');
    const $name = $('<div>').addClass('name');

    $result.append($info);
    $info.append($name);

    const $h3 = $('<h3>').text(rating.name);
    // const $h4Brew = $('<h4>').text(rating.brewery);
    const $h4Style = $('<h4>').text(rating.style);

    $name.append($h3);
    // $name.append($h4Brew);
    $name.append($h4Style);

    const $stats = $('<div>').addClass('stats');

    $info.append($stats);

    const $abvP = $('<p>').text(`ABV: ${rating.abv}`).addClass('abv');
    const $ibuP = $('<p>').text(`IBU: ${rating.ibu}`).addClass('ibu');

    const $star = $('<div>').addClass('star');
    const $starIcon = $('<i>').addClass('material-icons star-icon').text('grade');

    console.log(rating);

    if (rating.star) {
      $starIcon.addClass('star-gold');
    }

    $star.append($starIcon);
    $result.append($star);


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
    })
    .done(($xhr) => {
      userId = $xhr.id;
      $('#user-name').text(`${$xhr.firstName} ${$xhr.lastName}`)
    })
    .fail(() => {
      window.location.href = '/login.html';
    });

    const $xhr_2 = $.ajax({
      method: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      url: '/ratings'
    })
    .done((ratings) => {
      console.log(ratings);
      const $xhr_3 = $.ajax({
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        url: `/stars`
      })
      .done((stars) => {
        const results = ratings.map((rating) => {
          for (const star of stars) {
            if (rating.id === star.id) {
              rating.star = true;
              return rating;
            }
            rating.star = false;
            return rating;
          }
        })
        populateResults(results);
      })
      .fail(() => {
        window.location.href = '/login.html';
      });
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
      const $xhr_3 = $.ajax({
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        url: `/stars/${window.QUERY_PARAMETERS.userId}`
      })
      .done((stars) => {
        const results = ratings.map((rating) => {
          for (const star of stars) {
            if (rating.id === star.id) {
              rating.star = true;
              return rating;
            }
            rating.star = false;
            return rating;
          }
        })
        populateResults(results);
      })
      .fail(() => {
        window.location.href = '/login.html';
      });
    })
    .fail(() => {
      window.location.href = '/login.html';
    });
  }
};


// Populate Stars Tab with "Starred Beers"
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
      const results = stars.map((star) => {
        star.star = true;
        return star;
      });
      populateResults(results);
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
      const results = stars.map((star) => {
        star.star = true;
        return star;
      });
      populateResults(results);
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

let $allResults;
let beerData;

const loadBeerPage = function(event) {
  $('#filters-nav-container').addClass('off');
  $('#profile-beers').addClass('off');
  $allResults = $('.result');

  const $target = $(event.target).parents('.result');
  // console.log($target);

  beerData = $target.data();
  // console.log(beerData);

  $allResults.detach();
  $beerDisplay.addClass('off');

  $('#beer').removeClass('off');

  $('#beer-photo').attr('src', $target.find('.photo img').attr('src'));
  $('#name').text($target.find('.name h3').text());
  $('#brewery').text($target.find('.name h4').text());
  $('#style').text($target.find('.name h5').text());
  $('#abv').text($target.find('.abv').text());
  $('#ibu').text($target.find('.ibu').text());
  $('#rating').text($target.find('.rating').text());
}

// Exit individual beer "pop-up"
const exitBeerPage = function(event) {
  event.preventDefault();

  $('#filters-nav-container').removeClass('off');
  $('#profile-beers').removeClass('off');
  $('#beer').addClass('off');
  $('.rating-circle').removeClass('rating-color');
  $beerDisplay.append($allResults);
  $beerDisplay.removeClass('off');
}

// Color Rating Option on Beer Page
const colorCircles = function() {
  $('div.rating-circle').removeClass('rating-color');
  $(this).prevAll().addClass('rating-color');
  $(this).addClass('rating-color');
}

// Grab Rating from Page Before Rating is Submitted
// Event Listener for "Add Rating"
const submitRating = function() {
  const ratingCircles = document.querySelectorAll('.rating-circle');
  let ratingCount = 0;

  ratingCircles.forEach((div) => {
    if (div.classList.contains('rating-color')) {
      ratingCount++;
    }
  });

  if (ratingCount === 0) {
    console.log('No rating selected.');
    return;
  }

  // console.log(beerData);

  const ratingData = {
    beer_id: beerData.id,
    venue_id: 1,
    rating: ratingCount
  }

  const requestContent = JSON.stringify(ratingData);

  const $xhr_2 = $.ajax({
    method: 'POST',
    url: '/ratings',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(ratingData)
  })
  .done((data) => {
    window.location.href = '/profile.html';
  })
  .fail(() => {
    console.log('Failure');
  });
}

/* -------------------------------------------------------------------------------

Event Handlers and Function Calls

-------------------------------------------------------------------------------
*/

$('div.rating-circle').on('click', colorCircles);

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

// Load Beer Page
  const $beerDisplay = $('#beer-display');

  $beerDisplay.on('click', '.result', loadBeerPage);

// Exit Beer Page
  const $exit = $('i');

  $exit.on('click', exitBeerPage);

// Submit Rating from Beer Page
  $('#add-rating').on('click', submitRating);

//
})();
