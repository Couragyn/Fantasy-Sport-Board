exports.seed = function(knex, Promise) {
  return knex('admin').del()
    .then(function () {
      return Promise.all([
        knex('admin').insert({id: 1, username: 'admin', email: 'email', password: '$2a$10$QfrnmfamiP4JuXPKNpQWruQZZlfHJfea5uR8W5Q6elq9FkstvWJ2u'})
      ]);
    });
};
