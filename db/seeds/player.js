exports.seed = function(knex, Promise) {
  return knex('player').del()
    .then(function () {
      return Promise.all([
        knex('player').insert({id: 1, name: 'Max', position: 'TE', team: 'The Chillers', rookie: true, std_adp: 1, idp_adp: 1, ppr_adp: 1, position_adp: 1}),
      ]);
    });
};