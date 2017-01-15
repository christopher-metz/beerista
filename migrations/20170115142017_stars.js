'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('stars', (table) => {
    table.increments();
    table.integer('user_id')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE')
      .index();
    table.integer('beer_id')
      .notNullable()
      .references('beers.id')
      .onDelete('CASCADE')
      .index();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('stars');
};
