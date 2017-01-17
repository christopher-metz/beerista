(function() {

'use strict';

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
      }
    })
    .fail((err) => {
      console.log(err);
    })
  }

  $(window).on('load', checkForCookie);

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

  // Populate search results
  let beers = [];
  let $allResults;

  const populateResults = function() {

    console.log(beers);
    const $results = $('#results');
    $results.empty();

    for (const beer of beers) {
      const $result = $('<div>').addClass('result');
      const $photo = $('<div>').addClass('photo');

      $result.append($photo);

      const $img = $('<img>').attr('src', beer.photo_url);

      $photo.append($img);

      const $info = $('<div>').addClass('info');
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
      const $ratingP = $('<p>').text(`Rating: ${beer.rating}`).addClass('rating');

      $stats.append($abvP);
      $stats.append($ibuP);
      $stats.append($ratingP);

      $results.append($result);
    };
  };

  const getBeers = function() {
    const searchParam = $('.search-box').val();
    console.log(searchParam);

    const $xhr = $.ajax({
      method: 'GET',
      url: `/beers/?name=${searchParam}`,
      dataType: 'json'
    })
    .done((data) => {
      if ($xhr.status !== 200) {
        return;
      }
      console.log(data);

      beers = data;
      console.log(beers);
    })
    .fail(($xhr) => {
      console.log($xhr)
    });
  };

  const $search = $('#search-btn');
  console.log($search);
  const $searchInput = $('.search-box');
  // console.log($searchInput);

  $searchInput.on('input', getBeers);
  $searchInput.on('input', populateResults);

  const loadBeerPage = function(event) {
    event.preventDefault();

    $allResults = $('.result');

    const $target = $(event.target).parents('.result');
    // console.log($target);

    $allResults.detach();
    $results.addClass('off');

    $('#beer').removeClass('off');

    $('#beer-photo').attr('src', $target.find('.photo img').attr('src'));
    $('#name').text($target.find('.name h3').text());
    $('#brewery').text($target.find('.name h4').text());
    $('#style').text($target.find('.name h5').text());
    $('#abv').text($target.find('.abv').text());
    $('#ibu').text($target.find('.ibu').text());
    $('#rating').text($target.find('.rating').text());
  }

  const $results = $('#results');

  $results.on('click', '.result', loadBeerPage);

  const exitBeerPage = function(event) {
    event.preventDefault();

    $results.append($allResults);
    $results.removeClass('off');
  }

  const $exit = $('i');

  $exit.on('click', exitBeerPage);

  // Color Rating Option on Beer Page
  const colorCircles = function() {
    if ($(this).attr('style')) {
      $('div.rating-circle').css('backgroundColor', 'white');
      $(this).prevAll().css('backgroundColor', '#F0BB06');
      $(this).css('backgroundColor', '#F0BB06');
    }
    else {
      $(this).prevAll().css('backgroundColor', '#F0BB06');
      $(this).css('backgroundColor', '#F0BB06');
    }
  }

  $('div.rating-circle').on('click', colorCircles);

  // Grab Rating from Page Before Rating is Submitted

  // Event Listener for "Add Rating"
  const submitRating = function() {
    console.log($('.rating-circle'));
    const ratingCount = 0;
    $('.rating-circle').each((div) => {
      console.log(div);
      if (div.style.backgroundColor === '#F0BB06') {
        ratingCount++;
      }
    });

    console.log(ratingCount);
  }

  $('#add-rating').on('click', submitRating);


})();
