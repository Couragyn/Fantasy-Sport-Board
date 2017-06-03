exports.up = function(knex, Promise) {
  return knex.schema.createTable('league', function (table) {
    table.increments();
    table.integer('size');
    table.dateTime('start');
    table.integer('QB');
    table.integer('RB');
    table.integer('WR');
    table.integer('TE');
    table.integer('K');
    table.integer('DST');
    table.integer('DL');
    table.integer('LB');
    table.integer('DB');
    table.integer('bench');
    table.integer('commish_id');
    table.string('player_pool');
    table.string('draft_pool');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('league');
};
