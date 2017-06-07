exports.up = function(knex, Promise) {
  return knex.schema.createTable('team', function (table) {
    table.increments();
    table.integer('league_id');
    table.string('name');
    table.integer('draft_position');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('team');
};
