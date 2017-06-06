exports.up = function(knex, Promise) {
  return knex.schema.createTable('draft', function (table) {
    table.increments();
    table.integer('league_id');
    table.integer('year');
    table.string('draft_type');
    table.boolean('rookie');
    table.boolean('unlisted');
    table.string('start');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('draft');
};

