'use strict';

exports.seed = function(knex) {
  return knex('ratings').del()
    .then(() => {
      return knex('ratings')
        .insert([{
          id: 1,
          beer_id: 1,
          user_id: 1,
          venue_id: 1,
          rating: 4
        }, {
          id: 2,
          beer_id: 2,
          user_id: 1,
          venue_id: 1,
          rating: 5
        }, {
          id: 3,
          beer_id: 3,
          user_id: 1,
          venue_id: 1,
          rating: 5
        }, {
          id: 4,
          beer_id: 1,
          user_id: 2,
          venue_id: 1,
          rating: 3
        }, {
          id: 5,
          beer_id: 2,
          user_id: 2,
          venue_id: 1,
          rating: 2
        }, {
          id: 6,
          beer_id: 3,
          user_id: 2,
          venue_id: 1,
          rating: 5
        }])
        .then(() => {
          return knex.raw("SELECT setval('ratings_id_seq', (SELECT MAX(id) FROM ratings));");
        })
    });
};
