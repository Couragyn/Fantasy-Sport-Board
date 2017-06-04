exports.up = function(knex, Promise) {
  return knex.schema.createTable('league', function (table) {
    table.increments();
    table.integer('commish_id');
    table.integer('name');
    table.integer('size');
    table.string('start');
    table.string('scoring');
    table.string('type');
    table.integer('keepers');
    table.integer('QB');
    table.integer('RB');
    table.integer('WR');
    table.integer('TE');
    table.integer('RB/WR/TE');
    table.integer('RB/TE');
    table.integer('WR/TE');
    table.integer('QB/WR/RB/TE');
    table.integer('RB/WR');
    table.integer('K');
    table.integer('DST');
    table.integer('DL');
    table.integer('LB');
    table.integer('DB');
    table.integer('DE');
    table.integer('DT');
    table.integer('CB');
    table.integer('S');
    table.integer('IDP');
    table.integer('bench');
    table.string('positions');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('league');
};
