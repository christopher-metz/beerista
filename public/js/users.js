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
    });
  };

  $(window).on('load', checkForCookie);

  // Toggle Account Menu
  const toggleAccountMenu = function() {
    $('#drop-down-container').toggleClass('off');
  };

  $('#account-icon').on('click', toggleAccountMenu);

  // Navigate to other pages via Account Menu
  const findPeople = $('#find-people');
  const myBeers = $('#my-beers');
  const $logout = $('#log-out');

  findPeople.on('click', function() { window.location.href = '/users.html'; });
  myBeers.on('click', function() { window.location.href = '/profile.html'; });
  $logout.on('click', logout);

  // const menuOptions = $('#log-out');

  let users = [];
  let $allResults;

  const populateResults = function(users) {
    const $results = $('#results');
    $results.empty();

    for (const user of users) {
      const $result = $('<div>').addClass('result');

      $result.data("userId", user.id);

      const $photo = $('<div>').addClass('photo');

      $result.append($photo);

      const $i = $('<i>').text('account_circle').addClass('material-icons');

      $photo.append($i);

      const $info = $('<div>').addClass('info');
      const $name = $('<div>').addClass('name');

      $result.append($info);
      $info.append($name);

      const $h3 = $('<h3>').text(`${user.firstName} ${user.lastName}`);
      const $h4 = $('<h4>').text(`${user.city}, ${user.state}`);

      $name.append($h3);
      $name.append($h4);

      $results.append($result);
    }
    addResultListener();
  };

  // Get All users
  const getAllUsers = function() {
    const $xhr = $.ajax({
      method: 'GET',
      url: `/users/all`,
      dataType: 'json'
    })
    .done((data) => {
      if ($xhr.status !== 200) {
        return;
      }

      users = data;
      populateResults(users);
    })
    .fail(($xhr) => {
      console.log($xhr);
    });
  };

  // Get Users by Search Query
  const searchAllUsers = function() {
    const searchParam = $('.search-box').val();

    const $xhr = $.ajax({
      method: 'GET',
      url: `/users/search/?search=${searchParam}`,
      dataType: 'json'
    })
    .done((data) => {
      if ($xhr.status !== 200) {
        return;
      }

      users = data;
      populateResults(users);
    })
    .fail(($xhr) => {
      console.log($xhr);
    });
  };

  // Event Listeners to Populate Results
  const $search = $('#search-btn');
  const $searchInput = $('.search-box');

  $(window).on('load', getAllUsers);
  $searchInput.on('input', searchAllUsers);

  // Event Listeners to View Follow's Profile

  const sendToFollowPage = function(event) {
    const param = $(this).data();
    window.location.href = `/profile.html?userId=${param.userId}`;
  };

  const addResultListener = function() {
    $('.result').on('click', sendToFollowPage);
  };

})();
