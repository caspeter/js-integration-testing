'use strict';
exports.up = function(knex, Promise) {
    return knex.schema.createTable('puppies', function(table) {
        table.increments().primary();
        table.string('name').notNullable().defaultTo('');
        table.integer('age_in_months').notNullable().defaultTo(0);
        table.string('breed').notNullable().defaultTo('');
        table.text('image_url').notNullable().defaultTo('');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('puppies');
};
