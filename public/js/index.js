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
  const $findUsers = $('#find-users');
  const $myBeers = $('#my-beers');
  // const $settings = $('#settings');
  const $logout = $('#log-out');

  $myUsers.on('click', () => { window.location.href = '/users.html' });
  $myBeers.on('click', () => { window.location.href = '/profile.html' });
  $logout.on('click', logout);


  const handleGeneralSearch = (event) => {
    event.preventDefault();
    const searchBeer = $('input').val();
    window.location.href = `/search.html?input=${searchBeer}`;
  };

  const $form = $('form');
  $form.submit(handleGeneralSearch);
})();
