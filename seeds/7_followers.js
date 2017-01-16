'use strict';

exports.seed = function(knex) {
  return knex('followers').del()
    .then(() => {
      return knex('followers')
        .insert([{
          id: 1,
          user_id_1: 1,
          user_id_2: 2
        }, {
          id: 2,
          user_id_1: 2,
          user_id_2: 1
        }])
        .then(() => {
          return knex.raw("SELECT setval('followers_id_seq', (SELECT MAX(id) FROM followers));");
        })
    });
};
