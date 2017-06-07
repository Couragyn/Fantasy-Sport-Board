exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, username: 'ChillDude22', email: 'chill@chill.chill', password: 'chillness'})
      ]);
    });
};
