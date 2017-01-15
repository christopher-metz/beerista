'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('ratings', (table) => {
    table.increments();
    table.integer('beer_id')
      .notNullable()
      .references('beers.id')
      .onDelete('CASCADE')
      .index();
    table.integer('user_id')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE')
      .index();
    table.integer('venue_id')
      .notNullable()
      .references('venues.id')
      .onDelete('CASCADE')
      .index();
    table.integer('rating').notNullable().defaultTo(0);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ratings');
};
