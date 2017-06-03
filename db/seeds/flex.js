exports.seed = function(knex, Promise) {
  return knex('flex').del()
    .then(function () {
      return Promise.all([
        knex('flex').insert({league_id: 1, positions: 'chiller', amount: 1}),
      ]);
    });
};
