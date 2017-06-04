exports.seed = function(knex, Promise) {
  return knex('draft').del()
    .then(function () {
      return Promise.all([
        knex('draft').insert({id: 1, league_id: 1}),
      ]);
    });
};
