'use strict';

let isLogin = true;

const buildLogin = () => {
  $('label:contains("First Name")').remove();
  $('input[name|="first-name"]').remove();
  $('label:contains("Last Name")').remove();
  $('input[name|="last-name"]').remove();
  $('label:contains("City")').remove();
  $('input[name|="city"]').remove();
  $('label:contains("State")').remove();
  $('input[name|="state"]').remove();
  $('.signup').text('Create Account');
  $('button').text('Login');

  isLogin = true;
};

const buildSignUp = () => {
  let $label = $('<label>');
  let $input = $('<input>');
  const $signup = $('.signup');
  const $button = $('button');

  $label.text('First Name');
  $input.addClass('input-area');
  $input.attr('type', 'text');
  $input.attr('name', 'first-name');
  $input.attr('placeholder', 'Jane');

  $label.insertBefore($('label:contains("Email")'));
  $input.insertBefore($('label:contains("Email")'));

  $label = $('<label>');
  $input = $('<input>');

  $label.text('Last Name');
  $input.addClass('input-area');
  $input.attr('type', 'text');
  $input.attr('name', 'last-name');
  $input.attr('placeholder', 'Doe');

  $label.insertBefore($('label:contains("Email")'));
  $input.insertBefore($('label:contains("Email")'));

  $label = $('<label>');
  $input = $('<input>');

  $label.text('City');
  $input.addClass('input-area');
  $input.attr('type', 'text');
  $input.attr('name', 'city');
  $input.attr('placeholder', 'Seattle');

  $label.insertBefore($('label:contains("Password")'));
  $input.insertBefore($('label:contains("Password")'));

  $label = $('<label>');
  $input = $('<input>');

  $label.text('State');
  $input.addClass('input-area');
  $input.attr('type', 'text');
  $input.attr('name', 'state');
  $input.attr('placeholder', 'WA');

  $label.insertBefore($('label:contains("Password")'));
  $input.insertBefore($('label:contains("Password")'));

  $signup.text('Login');
  $button.text('Create Account');

  isLogin = false;
};

const handleAnchorClick = () => {
  if (isLogin) {
    buildSignUp();
  }
  else {
    buildLogin();
  }
};

(function() {
  const $form = $('form');

  $form.on('click', 'a', handleAnchorClick);
})();
