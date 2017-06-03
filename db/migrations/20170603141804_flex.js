exports.up = function(knex, Promise) {
  return knex.schema.createTable('flex', function (table) {
    table.integer('league_id');
    table.string('positions');
    table.integer('amount');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('flex');
};

