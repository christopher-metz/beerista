const results = document.querySelectorAll('.result');

const openBeerPage = function() {
  $('#search').addClass('off');
  $('#results').addClass('off');
  $('#beer').removeClass('off');
}

results.forEach((result) => {
  result.addEventListener('click', openBeerPage);
});
