const $results = $('.result');

const openBeerPage = function() {
  $('#beer').removeClass('off');
}

$results.on('click', openBeerPage);
