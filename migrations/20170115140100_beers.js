'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('beers', (table) => {
    table.increments();
    table.string('name').notNullable().defaultTo('');
    table.string('style').notNullable().defaultTo('');
    table.float('abv').notNullable().defaultTo(0);
    table.float('ibu').notNullable().defaultTo(0);
    table.float('source_rating').notNullable().defaultTo(0);
    table.integer('source_count').notNullable().defaultTo(0);
    table.string('source_id').notNullable().defaultTo('');
    table.string('photo_url').notNullable().defaultTo('');
    table.text('description').notNullable().defaultTo('');
    table.integer('brewery_id')
      .notNullable()
      .references('breweries.id')
      .onDelete('CASCADE')
      .index();
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('beers');
};
