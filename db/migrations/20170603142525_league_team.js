exports.up = function(knex, Promise) {
  return knex.schema.createTable('league_team', function (table) {
    table.integer('league_id');
    table.integer('team_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('league_team');
};