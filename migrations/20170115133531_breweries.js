'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('breweries', (table) => {
    table.increments();
    table.string('name').notNullable().defaultTo('');
    table.string('city').notNullable().defaultTo('');
    table.string('state').notNullable().defaultTo('');
    table.text('description').notNullable().defaultTo('');
    table.string('website').notNullable().defaultTo('');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('breweries');
};
