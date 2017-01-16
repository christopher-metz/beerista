'use strict';

exports.seed = function(knex) {
  return knex('venues').del()
    .then(() => {
      return knex('venues')
        .insert([{
          id: 1,
          name: 'Galvanize Cafe',
          city: 'Seattle',
          description: 'Galvanize is a school that has a cafe.',
          website: 'http://www.galvanize.com/cafe'
        }])
        .then(() => {
          return knex.raw("SELECT setval('venues_id_seq', (SELECT MAX(id) FROM venues));");
        });
    });
};
