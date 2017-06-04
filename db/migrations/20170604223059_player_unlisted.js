
exports.up = function(knex, Promise) {
  return knex.schema.createTable('player_unlisted', function (table) {
    table.increments();
    table.string('name');
    table.string('position');
    table.string('team');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('player_unlisted');
};
