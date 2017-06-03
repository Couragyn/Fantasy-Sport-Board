exports.seed = function(knex, Promise) {
  return knex('league_team').del()
    .then(function () {
      return Promise.all([
        knex('league_team').insert({league_id: 1, team_id: 1}),
      ]);
    });
};
