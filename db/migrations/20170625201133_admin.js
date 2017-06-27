
exports.up = function(knex, Promise) {
  return knex.schema.createTable('admin', function (table) {
    table.increments();
    table.string('username');
    table.string('email');
    table.string('password');
  });};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('admin');
};
