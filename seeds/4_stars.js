'use strict';

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('stars').del()
    .then(() => {
      return knex('stars')
        .insert([{
          id: 1,
          user_id: 1,
          beer_id: 1,
          active_flag: 1
        }, {
          id: 2,
          user_id: 1,
          beer_id: 2,
          active_flag: 1
        }, {
          id: 3,
          user_id: 1,
          beer_id: 3,
          active_flag: 1
        }, {
          id: 4,
          user_id: 1,
          beer_id: 4,
          active_flag: 1
        }, {
          id: 5,
          user_id: 1,
          beer_id: 5,
          active_flag: 1
        }, {
          id: 6,
          user_id: 1,
          beer_id: 6,
          active_flag: 1
        }, {
          id: 7,
          user_id: 1,
          beer_id: 7,
          active_flag: 1
        }, {
          id: 8,
          user_id: 1,
          beer_id: 8,
          active_flag: 1
        }, {
          id: 9,
          user_id: 1,
          beer_id: 9,
          active_flag: 1
        }, {
          id: 10,
          user_id: 1,
          beer_id: 10,
          active_flag: 1
        }, {
          id: 11,
          user_id: 2,
          beer_id: 1,
          active_flag: 1
        }, {
          id: 12,
          user_id: 2,
          beer_id: 2,
          active_flag: 1
        }, {
          id: 13,
          user_id: 2,
          beer_id: 3,
          active_flag: 1
        }, {
          id: 14,
          user_id: 2,
          beer_id: 4,
          active_flag: 1
        }])
        .then(() => {
          return knex.raw("SELECT setval('stars_id_seq', (SELECT MAX(id) FROM stars));");
        });
    });
};
