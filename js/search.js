'use strict';

const data = [{photoURL: 'https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png', name: 'Belgian White', brewery: 'Blue Moon Brewing Company', style: 'Witbier', abv: '5.4%', ibu: '20', rating: '3.4/5.0' },{photoURL: 'https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png', name: 'Belgian White', brewery: 'Blue Moon Brewing Company', style: 'Witbier', abv: '5.4%', ibu: '20', rating: '3.4/5.0' },{photoURL: 'https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png', name: 'Belgian White', brewery: 'Blue Moon Brewing Company', style: 'Witbier', abv: '5.4%', ibu: '20', rating: '3.4/5.0' },{photoURL: 'https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png', name: 'Belgian White', brewery: 'Blue Moon Brewing Company', style: 'Witbier', abv: '5.4%', ibu: '20', rating: '3.4/5.0' },{photoURL: 'https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png', name: 'Belgian White', brewery: 'Blue Moon Brewing Company', style: 'Witbier', abv: '5.4%', ibu: '20', rating: '3.4/5.0' },{photoURL: 'https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png', name: 'Belgian White', brewery: 'Blue Moon Brewing Company', style: 'Witbier', abv: '5.4%', ibu: '20', rating: '3.4/5.0' },{photoURL: 'https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png', name: 'Belgian White', brewery: 'Blue Moon Brewing Company', style: 'Witbier', abv: '5.4%', ibu: '20', rating: '3.4/5.0' },{photoURL: 'https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png', name: 'Belgian White', brewery: 'Blue Moon Brewing Company', style: 'Witbier', abv: '5.4%', ibu: '20', rating: '3.4/5.0' },{photoURL: 'https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png', name: 'Belgian White', brewery: 'Blue Moon Brewing Company', style: 'Witbier', abv: '5.4%', ibu: '20', rating: '3.4/5.0' },{photoURL: 'https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png', name: 'Belgian White', brewery: 'Blue Moon Brewing Company', style: 'Witbier', abv: '5.4%', ibu: '20', rating: '3.4/5.0' },{photoURL: 'https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png', name: 'Belgian White', brewery: 'Blue Moon Brewing Company', style: 'Witbier', abv: '5.4%', ibu: '20', rating: '3.4/5.0' },{photoURL: 'https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png', name: 'Belgian White', brewery: 'Blue Moon Brewing Company', style: 'Witbier', abv: '5.4%', ibu: '20', rating: '3.4/5.0' },{photoURL: 'https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png', name: 'Belgian White', brewery: 'Blue Moon Brewing Company', style: 'Witbier', abv: '5.4%', ibu: '20', rating: '3.4/5.0' },{photoURL: 'https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png', name: 'Belgian White', brewery: 'Blue Moon Brewing Company', style: 'Witbier', abv: '5.4%', ibu: '20', rating: '3.4/5.0' },{photoURL: 'https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png', name: 'Belgian White', brewery: 'Blue Moon Brewing Company', style: 'Witbier', abv: '5.4%', ibu: '20', rating: '3.4/5.0' },{photoURL: 'https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png', name: 'Belgian White', brewery: 'Blue Moon Brewing Company', style: 'Witbier', abv: '5.4%', ibu: '20', rating: '3.4/5.0' },{photoURL: 'https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png', name: 'Belgian White', brewery: 'Blue Moon Brewing Company', style: 'Witbier', abv: '5.4%', ibu: '20', rating: '3.4/5.0' },{photoURL: 'https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png', name: 'Belgian White', brewery: 'Blue Moon Brewing Company', style: 'Witbier', abv: '5.4%', ibu: '20', rating: '3.4/5.0' },{photoURL: 'https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png', name: 'Belgian White', brewery: 'Blue Moon Brewing Company', style: 'Witbier', abv: '5.4%', ibu: '20', rating: '3.4/5.0' },{photoURL: 'https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png', name: 'Belgian White', brewery: 'Blue Moon Brewing Company', style: 'Witbier', abv: '5.4%', ibu: '20', rating: '3.4/5.0' },{photoURL: 'https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png', name: 'Belgian White', brewery: 'Blue Moon Brewing Company', style: 'Witbier', abv: '5.4%', ibu: '20', rating: '3.4/5.0' }];
console.log(data);

let $allResults;

const populateResults = function(event) {
  const $results = $('#results');
  $results.empty();

  for (const beer of data) {
    const $result = $('<div>').addClass('result');
    const $photo = $('<div>').addClass('photo');

    $result.append($photo);

    const $img = $('<img>').attr('src', beer.photoURL);

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

    event.preventDefault();
  };
}

const $search = $('#search form button');

$search.on('click', populateResults);


const loadBeerPage = function(event) {
  event.preventDefault();

  $allResults = $('.result');

  const $target = $(event.target).parents('.result');
  console.log($target);

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
