(function() {

'use strict';

let isRatings = 'rate'; // State of tabs can be rate, star, follow.
let beers;

const populateResults = function(ratings) {
  const $beerDisplay = $('#beer-display');

  $beerDisplay.empty();

  beers = ratings;

  for (const rating of ratings) {
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

    if (rating.starred) {
      $starIcon.addClass('star-gold');
    }

    $star.append($starIcon);
    $result.append($star);


    $stats.append($abvP);
    $stats.append($ibuP);

    if (isRatings === 'rate') {
      const $ratingP = $('<p>').text(`Rating: ${rating.rating}`).addClass('rating');
      $stats.append($ratingP);
    }

    $beerDisplay.append($result);
  };
};

let follows = [];
let $allResults;

const appendFollowing = function(data) {
  const $beerDisplay = $('#beer-display');
  $beerDisplay.empty();

  for (const follow of data) {
    console.log(follow);
    const $result = $('<div>').addClass('result');

    $result.data("userId", follow.id);

    const $photo = $('<div>').addClass('photo');

    $result.append($photo);

    const $i = $('<i>').text('account_circle').addClass('material-icons');

    $photo.append($i);

    const $info = $('<div>').addClass('info-follow');
    const $name = $('<div>').addClass('name');

    $result.append($info);
    $info.append($name);

    const $h3 = $('<h3>').text(`${follow.firstName} ${follow.lastName}`);
    const $h4 = $('<h4>').text(`${follow.city}, ${follow.state}`);

    $name.append($h3);
    $name.append($h4);

    $beerDisplay.append($result);
  };
};

// const sendToFollowPage = function(event) {
//   const param = $(this).data();
//   console.log(param);
//   window.location.href = `/profile.html?userId=${param.userId}`;
// };
//
// const addResultListener = function() {
//   $('.result').on('click', sendToFollowPage);
// };

const populateRatings = () => {
  let userId;

  $('#rated-beers').addClass('shadow');
  $('#starred-beers').removeClass('shadow');
  $('#following').removeClass('shadow');

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
      // window.location.href = '/login.html';
    });

    const $xhr_2 = $.ajax({
      method: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      url: '/ratings'
    })
    .done((dataRatings) => {
      // console.log(dataRatings);
      const $xhr_3 = $.ajax({
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        url: `/stars`
      })
      .done((dataStars) => {
        // console.log(dataStars);
        const results = dataRatings.map((dataRating) => {
          for (const dataStar of dataStars) {
            dataRating.starred = false;
            if (dataRating.id === dataStar.id) {
              dataRating.starred = true;
              return dataRating;
            }
          }
          return dataRating;
        })
        console.log(results);
        populateResults(results);
      })
      .fail(() => {
        // window.location.href = '/login.html';
      });
    })
    .fail(() => {
      populateResults([]);
      const $h5 = $('<h5>').text('You haven\'t rated any beers yet.');
      $('#beer-display').append($h5);
      // window.location.href = '/login.html';
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
    .done((dataRatings) => {
      const $xhr_3 = $.ajax({
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        url: `/stars`
      })
      .done((dataStars) => {
        const results = dataRatings.map((dataRating) => {
          for (const dataStar of dataStars) {
            dataRating.starred = false;
            if (dataRating.id === dataStar.id) {
              dataRating.starred = true;
              return dataRating;
            }
          }
          return dataRating;
        })
        populateResults(results);
      })
      .fail(() => {
        // window.location.href = '/login.html';
      });
    })
    .fail(() => {
      // window.location.href = '/login.html';
    });
  }
};


// Populate Stars Tab with "Starred Beers"
const populateStars = () => {
  let userId;

  $('#starred-beers').addClass('shadow');
  $('#rated-beers').removeClass('shadow');
  $('#following').removeClass('shadow');

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
      // window.location.href = '/login.html';
    });

    const $xhr_2 = $.ajax({
      method: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      url: '/stars'
    })
    .done((stars) => {
      const results = stars.map((star) => {
        star.starred = true;
        return star;
      });
      populateResults(results);
    })
    .fail(() => {
      populateResults([]);
      const $h5 = $('<h5>').text('You haven\'t starred any beers yet.');
      $('#beer-display').append($h5);
      // window.location.href = '/login.html';
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
    .done((followStars) => {
      const $xhr_3 = $.ajax({
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        url: '/stars'
      })
      .done((yourStars) => {
        const results = followStars.map((followStar) => {
          for (const yourStar of yourStars) {
            followStar.starred = false;
            if (followStar.id === yourStar.id) {
              followStar.starred = true;
              return followStar;
            }
          }
          return followStar;
        });
        populateResults(results);
      })
      .fail(() => {
        console.log('Failure at xhr_3');
      })
    })
    .fail(() => {
      populateResults([]);
      const $h5 = $('<h5>').text('You haven\'t starred any beers yet.');
      $('#beer-display').append($h5);
      // window.location.href = '/login.html';
    });
  }
};

const populateFollowing = () => {
  let userId;

  $('#following').addClass('shadow');
  $('#rated-beers').removeClass('shadow');
  $('#starred-beers').removeClass('shadow');

  window.QUERY_PARAMETERS = {};

  if (window.location.search) {
    window.location.search.substr(1).split('&').forEach((paramStr) => {
      const param = paramStr.split('=');

      window.QUERY_PARAMETERS[param[0]] = param[1];
    });
  }

  if (!window.location.search) {
    const $xhr = $.ajax({
      method: 'GET',
      url: '/followers',
      dataType: 'json'
    });
    $xhr.done((data) => {
      if ($xhr.status !== 200) {
        return;
      }

      appendFollowing(data);
    });
    $xhr.fail((err) => {
      appendFollowing([]);
      const $h5 = $('<h5>').text('You aren\'t following any people yet.');
      $('#beer-display').append($h5);
    });
  }
  else {
    console.log(window.QUERY_PARAMETERS.userId);
    const $xhr = $.ajax({
      method: 'GET',
      url: `/followers/${window.QUERY_PARAMETERS.userId}`,
      dataType: 'json'
    });
    $xhr.done((data) => {
      if ($xhr.status !== 200) {
        return;
      }

      appendFollowing(data);
    });
    $xhr.fail((err) => {
      console.log(err);
    });
  }
}

/*---------------------------------------------------*/
// Gather filter results for specific beer search.
const populateRatingsBeer = (event) => {
  event.preventDefault();

  const searchInput = $('input[name|="find-a-beer"]').val();
  console.log({ input: `${searchInput}` });
  const $xhr = $.ajax({
    method: 'GET',
    url: `/ratingsbeer/${searchInput}`,
    dataType: 'json'
  })
  $xhr.done((ratingsbeers) => {
    const $xhr_2 = $.ajax({
      method: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      url: `/stars`
    })
    .done((dataStars) => {
      if ($xhr_2.status !== 200) {
        return;
      }

      const results = ratingsbeers.map((ratingbeer) => {
        for (const dataStar of dataStars) {
          ratingbeer.starred = false;
          if (ratingbeer.id === dataStar.id) {
            ratingbeer.starred = true;
            return ratingbeer;
          }
        }
        return ratingbeer;
      })
      populateResults(results);
    })
    .fail((err) => {
      console.log(err);
    })
  });
  $xhr.fail((err) => {
    populateResults([]);
    window.alert(`${err.responseText}`);
    return;
  });
};

/*---------------------------------------------------*/
// Gather filter results for minimum rating search.
const populateRatingsRating = (event) => {
  event.preventDefault();

  const ratingInput = $('input[name|="find-by-rating"]').val();
  if (ratingInput < 1 || ratingInput > 5) {
    window.alert('Minimum rating must be between 1 and 5');
    return;
  }

  const $xhr = $.ajax({
    method: 'GET',
    url: `/ratingsrating/${ratingInput}`,
    dataType: 'json'
  });
  $xhr.done((ratingsratings) => {
    if ($xhr.status !== 200) {
      return;
    }

    const $xhr_2 = $.ajax({
      method: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      url: `/stars`
    })
    .done((dataStars) => {
      if ($xhr_2.status !== 200) {
        return;
      }
      const results = ratingsratings.map((ratingrating) => {
        for (const dataStar of dataStars) {
          ratingrating.starred = false;
          if (ratingrating.id === dataStar.id) {
            ratingrating.starred = true;
            return ratingrating;
          }
        }
        return ratingrating;
      })
      populateResults(results);
    })
    .fail((err) => {
      console.log(err);
    })
  });
  $xhr.fail((err) => {
    populateResults([]);
    window.alert(`${err.responseText}`);
    return;
  });
};

/*---------------------------------------------------*/
// Gather filter results for minimum rating search.
const populateRatingsStyle = (event) => {
  event.preventDefault();

  const styleInput = $('input[name|="find-by-style"]').val();
  const $xhr = $.ajax({
    method: 'GET',
    url: `/ratingsstyle/${styleInput}`,
    dataType: 'json'
  });
  $xhr.done((styles) => {
    if ($xhr.status !== 200) {
      return;
    }

    const $xhr_2 = $.ajax({
      method: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      url: `/stars`
    })
    .done((dataStars) => {
      if ($xhr_2.status !== 200) {
        return;
      }
      const results = styles.map((style) => {
        for (const dataStar of dataStars) {
          style.starred = false;
          if (style.id === dataStar.id) {
            style.starred = true;
            return style;
          }
        }
        return style;
      })
      populateResults(results);
    })
    .fail((err) => {
      console.log(err);
    })
  });
  $xhr.fail((err) => {
    populateResults([]);
    window.alert(`${err.responseText}`);
    return;
  });
};

/*---------------------------------------------------*/
// Gather filter results for minimum rating search.
const populateRatingsBrewery = (event) => {
  event.preventDefault();

  const breweryInput = $('input[name|="find-by-brewery"]').val();
  const $xhr = $.ajax({
    method: 'GET',
    url: `/ratingsbrewery/${breweryInput}`,
    dataType: 'json'
  });
  $xhr.done((breweries) => {
    if ($xhr.status !== 200) {
      return;
    }

    const $xhr_3 = $.ajax({
      method: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      url: `/stars`
    })
    .done((dataStars) => {
      if ($xhr.status !== 200) {
        return;
      }
      const results = breweries.map((brewery) => {
        for (const dataStar of dataStars) {
          brewery.starred = false;
          if (brewery.id === dataStar.id) {
            brewery.starred = true;
            return brewery;
          }
        }
        return brewery;
      })
      populateResults(results);
    })
    .fail((err) => {
      console.log(err);
    })
  });
  $xhr.fail((err) => {
    populateResults([]);
    window.alert(`${err.responseText}`);
    return;
  });
};

/*------------------------------------------------------------*/

const handleStarsOrRating = (event) => {
  const $target = $(event.target);
  console.log($target);
  if ($target.parent()[0].id === 'rated-beers' || $target[0].id === 'rated-beers') {
    isRatings = 'rate';
    $('#filter-btn').removeClass('off');
    populateRatings();
  }
  else if ($target.parent()[0].id === 'starred-beers' || $target[0].id === 'starred-beers'){
    isRatings = 'star';
    $('#find-a-beer, #find-by-rating, #find-by-style, #find-by-brewery').addClass('off');
    $('#filter-options').addClass('off');
    filterOpen = false;
    $('#filter-btn').addClass('off');
    populateStars();
  }
  else {
    isRatings = 'follow';
    $('#find-a-beer, #find-by-rating, #find-by-style, #find-by-brewery').addClass('off');
    $('#filter-options').addClass('off');
    filterOpen = false;
    $('#filter-btn').addClass('off');
    populateFollowing();
  }
};

const toggleAccountMenu = function() {
  $('#drop-down-container').toggleClass('off');
};

const handleGeneralSearch = (event) => {
  event.preventDefault();
  const searchBeer = $('input').val();
  window.location.href = `/search.html?input=${searchBeer}`;
};

let beerData;

const updateStar = function(event) {
  $(event.target).toggleClass('star-gold');
  $(event.target).parents('.result').data().starred = !$(event.target).parents('.result').data().starred;

  // console.log($(event.target).parents('.result').data());

  const id = $(event.target).parents('.result').data().id;
  const starred = $(event.target).parents('.result').data().starred;


  if (starred) {
    // console.log('contains-gold');
    const $xhr = $.ajax({
      method: 'POST',
      url: '/stars',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({ beerId: id })
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
    // console.log('doesn\'t contain gold');
    const $xhr_2 = $.ajax({
      method: 'DELETE',
      url: '/stars',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({ beerId: id})
    })
    .done((star) => {
      console.log(star);
    })
    .fail(() => {
      console.log('Failure');
    });
  }
}

const loadBeerPage = function(event) {
  if (isRatings === 'follow') {
    console.log($(event.target).parents('.result'));
    const id = $(event.target).parents('.result').data().userId;

    window.location.href = `/profile.html?userId=${id}`;
    return;
  }

  if (event.target.classList.contains('star-icon')) {
    updateStar(event);
    return;
  }

  $('#filters-nav-container').addClass('off');
  $allResults = $('.result');

  const $target = $(event.target).parents('.result');

  beerData = $target.data();

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
  })
};

let filterOpen = false;

const toggleFilter = function() {
  if (filterOpen) {
    $('#find-a-beer, #find-by-rating, #find-by-style, #find-by-brewery').addClass('off');
    $('#filter-options').addClass('off');
    populateRatings();
    filterOpen = false;
  }
  else {
    $('#filter-options').removeClass('off');
    filterOpen = true;
  }
};

const openThisFilter = function() {
  const text = $(this).text();

  $('#filter-options').addClass('off');

  switch (text) {
    case 'Beer':
      $('#find-a-beer').removeClass('off');
      break;
    case 'Rating':
      $('#find-by-rating').removeClass('off');
      break;
    case 'Style':
      $('#find-by-style').removeClass('off');
      break;
    case 'Brewery':
      $('#find-by-brewery').removeClass('off');
      break;
    default:

  }
};

let isFollowing = false;

const showFollowButton = function() {
  const param = window.location.search;
  const userId = Number.parseInt(window.location.search.slice(param.indexOf('=') + 1));

  if (userId) {
    $('#follow-user').removeClass('off');

    const $xhr = $.ajax({
      method: 'GET',
      url: `/follows/?userId2=${userId}`,
      contentType: 'application/json',
      dataType: 'json',
    })
    .done((bool) => {
      console.log(bool);
      if (bool) {
        $('#follow-user').text('Unfollow');
        isFollowing = true;
      }
    })
    .fail(($xhr) => {
      console.log($xhr);
    })
  }
}

const followOrUnfollow = function() {
  const param = window.location.search;
  const userId = Number.parseInt(window.location.search.slice(param.indexOf('=') + 1));

  if (isFollowing) {
    const $xhr = $.ajax({
      method: 'DELETE',
      url: `/followers/${userId}`,
      contentType: 'application/json',
      dataType: 'json'
    })
    .done((follow) => {
      isFollowing = false;
      $('#follow-user').text('Follow');
    })
    .fail(($xhr) => {
      console.log($xhr);
    });
  }
  else {
    const $xhr = $.ajax({
      method: 'POST',
      url: `/followers/${userId}`,
      contentType: 'application/json',
      dataType: 'json'
    })
    .done((follow) => {
      isFollowing = true;
      $('#follow-user').text('Unfollow');
    })
    .fail(($xhr) => {
      console.log($xhr);
    })
  }
}

/* -------------------------------------------------------------------------------

Event Handlers and Function Calls

-------------------------------------------------------------------------------
*/

$('div.rating-circle').on('click', colorCircles);

  // Toggle Account Menu
  $('#account-icon').on('click', toggleAccountMenu);

  // Navigate to other pages via Account Menu
  const findPeople = $('#find-people');
  const myBeers = $('#my-beers');
  // const settings = $('#settings');
  const $logout = $('#log-out');

  findPeople.on('click', () => { window.location.href = '/users.html' });
  myBeers.on('click', () => { window.location.href = '/profile.html' });
  $logout.on('click', logout);

  // const menuOptions = $('#log-out');
/*-------------------------------------------------*/
  populateRatings();

  $('#profile-menu').on('click', handleStarsOrRating);

// Filter options
  const $filter = $('#filter-btn');

  $filter.on('click', toggleFilter);

  const $generalSearch = $('#general-search');
  // $generalSearch.on('submit', handleGeneralSearch);
  $generalSearch.submit(handleGeneralSearch);

// Load Beer Page
  const $beerDisplay = $('#beer-display');

  $beerDisplay.on('click', '.result', loadBeerPage);

// Exit Beer Page
  const $exit = $('i');

  $exit.on('click', exitBeerPage);

// Submit Rating from Beer Page
  $('#add-rating').on('click', submitRating);

// Filter Option Btn click
  $('.filter-option-btn').on('click', openThisFilter);

// Show Follow Button or not
  $(window).on('load', showFollowButton);

  $('#follow-user').on('click', followOrUnfollow);

  // Filter beer
  $('#find-a-beer').submit(populateRatingsBeer);
  // Filter rating
  $('#find-by-rating').submit(populateRatingsRating);
  // Filter style
  $('#find-by-style').submit(populateRatingsStyle);
  // Filter brewery
  $('#find-by-brewery').submit(populateRatingsBrewery);
})();
