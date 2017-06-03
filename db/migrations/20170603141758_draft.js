exports.up = function(knex, Promise) {
  return knex.schema.createTable('draft', function (table) {
    table.increments();
    table.integer('league_id');
    table.integer('round');
    table.integer('pick');
    table.integer('player_id');
    table.integer('team_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('draft');
};

