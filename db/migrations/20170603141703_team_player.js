exports.up = function(knex, Promise) {
  return knex.schema.createTable('team_player', function (table) {
    table.integer('team_id');
    table.integer('player_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('team_player');
};