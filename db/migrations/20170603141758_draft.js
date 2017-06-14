exports.up = function(knex, Promise) {
  return knex.schema.createTable('draft', function (table) {
    table.increments();
    table.integer('league_id');
    table.integer('year');
    table.integer('rounds');
    table.string('draft_type');
    table.string('pool');
    table.string('start_type');
    table.dateTime('date_time');
    table.string('status');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('draft');
};
