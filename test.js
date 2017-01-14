const Yelp = require('yelp');

const yelp = new Yelp({
  consumer_key: 'hSoA-h_BmJSHiibeQa55Dw',
  consumer_secret: '0tklnXKk5kONbtMTa5M-reIBTsg',
  token: 'SDoCKtRE6vi2GJRY60e9rRvS-0C2vjJ1',
  token_secret: 'jbX-8TIwuBRk_jr49cWuXP0cmfs',
});

// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({ term: 'Browers', location: 'Seattle' })
.then(function (data) {
  console.log(data);
})
.catch(function (err) {
  console.error(err);
});

// See http://www.yelp.com/developers/documentation/v2/business
// yelp.business('yelp-san-francisco')
//   .then(console.log)
//   .catch(console.error);
//
// yelp.phoneSearch({ phone: '+15555555555' })
//   .then(console.log)
//   .catch(console.error);

// A callback based API is also available:
// yelp.business('yelp-san-francisco', function(err, data) {
//   if (err) return console.log(error);
//   console.log(data);
// });
