module.exports = function createNewUser(username, password, knex) {
  knex('users').insert({username: username, password: password})
    .catch(function(err){
      console.log(err);
    })
    console.log('added', username, 'and', password, 'to database');
}