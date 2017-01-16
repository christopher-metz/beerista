'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('followers', (table) => {
    table.increments();
    table.integer('user_id_1')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE')
      .index();
    table.integer('user_id_2')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE')
      .index();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('followers');
};
