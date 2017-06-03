exports.seed = function(knex, Promise) {
  return knex('user').del()
    .then(function () {
      return Promise.all([
        knex('user').insert({id: 1, username: 'ChillDude22', password: 'chillness'}),
      ]);
    });
};
