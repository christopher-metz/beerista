'use strict';

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

// Toggle Account Menu
const toggleAccountMenu = function() {
  $('#drop-down-container').toggleClass('off');
};

const handleGeneralSearch = (event) => {
  event.preventDefault();
  const searchBeer = $('input').val();
  window.location.href = `/search.html?input=${searchBeer}`;
};

const getUser = (resolve, reject) => {
  const $xhr = $.ajax({
    method: 'GET',
    url: '/users',
    dataType: 'JSON'
  })
  .done((user) => {
    if ($xhr.status !== 200) {
      reject;
    }

    resolve(user);
  })
  .fail((err) => {
    reject(err);
  })
};

const handleEditUser = (event) => {
  event.preventDefault();

  const firstName = $('input[name|="first-name"]').val();
  const lastName = $('input[name|="last-name"]').val();
  const email = $('input[name|="email"]').val();
  const city = $('input[name|="city"]').val();
  const state = $('input[name|="state"]').val();
  const user = { firstName, lastName, email, city, state };

  const $xhr = $.ajax({
    method: 'PATCH',
    url: '/users',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(user)
  });
  $xhr.done((user) => {
    if ($xhr.status !== 200) {
      return;
    }

    window.location.href = '/profile.html';
  });
  $xhr.fail((err) => {
    return err;
  });
};

const handleDeleteUser = (event) => {
  event.preventDefault();

  const $xhr = $.ajax({
    method: 'DELETE',
    url: '/users',
    dataType: 'json',
    contentType: 'application/json'
  });
  $xhr.done((user) => {
    if ($xhr.status !== 200) {
      return;
    }

    window.location.href = '/login.html';
  });
  $xhr.fail((err) => {
    return err;
  });
};

const loadDeleteConfirm = (event) => {
  event.preventDefault();

  // $allResults.detach();
  // $target.parents('#results').addClass('off');

  $('#confirm').removeClass('off');

  // $('#beer-photo').attr('src', $target.find('.photo img').attr('src'));
  // $('#name').text($target.find('.name h3').text());
  // $('#brewery').text($target.find('.name h4').text());
  // $('#style').text($target.find('.name h5').text());
  // $('#abv').text($target.find('.abv').text());
  // $('#ibu').text($target.find('.ibu').text());
  // $('#rating').text($target.find('.rating').text());
};

const exitDeleteConfirm = (event) => {
  event.preventDefault();

  $('#confirm').addClass('off');
  // $('.rating-circle').removeClass('rating-color');
  // $('#results').append($allResults);
  // $('#results').removeClass('off');
};

(function() {
  const user = new Promise(getUser);
  user.then((user) => {
    $('input[name|="first-name"]').val(user.firstName);
    $('input[name|="last-name"]').val(user.lastName);
    $('input[name|="email"]').val(user.email);
    $('input[name|="city"]').val(user.city);
    $('input[name|="state"]').val(user.state);
  });
  user.catch((err) => {
    console.error(err);
  });

  $('#account-icon').on('click', toggleAccountMenu);

  // Navigate to other pages via Account Menu
  const $myFollows = $('#my-follows');
  const $myBeers = $('#my-beers');
  // const $settings = $('#settings');
  const $logout = $('#log-out');

  $myFollows.on('click', () => { window.location.href = '/followers.html' });
  $myBeers.on('click', () => { window.location.href = '/profile.html' });
  $logout.on('click', logout);

  const $generalSearch = $('#general-search');
  $generalSearch.submit(handleGeneralSearch);

  const $userInfo = $('#user-info');
  $userInfo.submit(handleEditUser);

  const $delete = $('#delete');
  $delete.on('click', loadDeleteConfirm);

  const $remove = $('#remove');
  $remove.on('click', handleDeleteUser);

  const $cancel = $('cancel');
  $cancel.on('click', exitDeleteConfirm);
})();
