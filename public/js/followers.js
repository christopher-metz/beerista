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

  $(window).on('load', checkForCookie);

  // Toggle Account Menu
  const toggleAccountMenu = function() {
    $('#drop-down-container').toggleClass('off');
  }

  $('#account-icon').on('click', toggleAccountMenu);

  // Navigate to other pages via Account Menu
  // const myFriends = $('#my-friends');
  const myBeers = $('#my-beers');
  // const settings = $('#settings');
  const $logout = $('#log-out');

  // myFriends.on('click', function() { window.location.href = '/friends.html' });
  myBeers.on('click', function() { window.location.href = '/profile.html' });
  $logout.on('click', logout);

  // const menuOptions = $('#log-out');

  let follows = [];
  let $allResults;

  const populateResults = function() {

    console.log(follows);
    const $results = $('#results');
    $results.empty();

    for (const follow of follows) {
      const $result = $('<div>').addClass('result');

      $result.data("userId", follow.id);

      const $photo = $('<div>').addClass('photo');

      $result.append($photo);

      const $i = $('<i>').text('account_circle').addClass('material-icons');

      $photo.append($i);

      const $info = $('<div>').addClass('info');
      const $name = $('<div>').addClass('name');

      $result.append($info);
      $info.append($name);

      const $h3 = $('<h3>').text(`${follow.firstName} ${follow.lastName}`);
      const $h4 = $('<h4>').text(`${follow.city}, ${follow.state}`);

      $name.append($h3);
      $name.append($h4);

      $results.append($result);
    };
    addResultListener();
  };

  // Get All Follows
  const getAllFollows = function() {
    const searchParam = $('.search-box').val();
    console.log(searchParam);

    const $xhr = $.ajax({
      method: 'GET',
      url: `/followers/?name=${searchParam}`,
      dataType: 'json'
    })
    .done((data) => {
      if ($xhr.status !== 200) {
        return;
      }
      console.log(data);

      follows = data;
      console.log(follows);
      populateResults();
    })
    .fail(($xhr) => {
      console.log($xhr);
    });
  };

  // Get Followers by Search Query
  const getFollow = function() {
    const searchParam = $('.search-box').val();
    console.log(searchParam);

    const $xhr = $.ajax({
      method: 'GET',
      url: `/followers/?name=${searchParam}`,
      dataType: 'json'
    })
    .done((data) => {
      if ($xhr.status !== 200) {
        return;
      }
      console.log(data);

      follows = data;
      console.log(follows);
    })
    .fail(($xhr) => {
      console.log($xhr);
    });
  };

  // Event Listeners to Populate Results
  const $search = $('#search-btn');
  console.log($search);
  const $searchInput = $('.search-box');
  // console.log($searchInput);

  $(window).on('load', getAllFollows);
  $searchInput.on('input', getFollow);
  $searchInput.on('input', populateResults);

  // Event Listeners to View Follow's Profile

  const sendToFollowPage = function(event) {
    const param = $(this).data();
    console.log(param);
    window.location.href = `/profile.html?userId=${param.userId}`;
  }

  const addResultListener = function() {
    $('.result').on('click', sendToFollowPage);
  }

})();
