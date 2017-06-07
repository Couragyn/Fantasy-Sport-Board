exports.up = function(knex, Promise) {
  return knex.schema.createTable('league', function (table) {
    table.increments();
    table.integer('commish_id');
    table.string('name');
    table.integer('size');
    table.string('scoring');
    table.string('type');
    table.integer('keepers');
    table.integer('QB');
    table.integer('RB');
    table.integer('WR');
    table.integer('TE');
    table.integer('RB_WR_TE');
    table.integer('RB_TE');
    table.integer('WR_TE');
    table.integer('QB_WR_RB_TE');
    table.integer('RB_WR');
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
    table.integer('Bench');
    table.string('positions');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('league');
};
