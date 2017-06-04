
exports.up = function(knex, Promise) {
  return knex.schema.createTable('draft_picks', function (table) {
    table.increments();
    table.integer('draft_id');
    table.integer('round');
    table.integer('pick');
    table.integer('player_id');
    table.integer('team_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('draft_picks');
};
