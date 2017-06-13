exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_teams', function (table) {
    table.integer('user_id');
    table.integer('team_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_teams');
};
