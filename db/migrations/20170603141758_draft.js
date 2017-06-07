exports.up = function(knex, Promise) {
  return knex.schema.createTable('draft', function (table) {
    table.increments();
    table.integer('league_id');
    table.integer('year');
    table.integer('rounds');
    table.string('draft_type');
    table.boolean('rookie');
    table.string('start_type');
    table.dateTime('date_time');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('draft');
};
