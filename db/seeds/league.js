exports.seed = function(knex, Promise) {
  return knex('league').del()
    .then(function () {
      return Promise.all([
        knex('league').insert({id: 1, size: 10, start: '10/10/2010', QB: 1, RB: 1, WR: 1, TE: 1, K: 1, DST: 1, DL: 1, LB: 1, DB: 1, Bench: 1}),
      ]);
    });
};
