module.exports = function createNewUser(username, email, password, knex) {
  knex('users').insert({username: username, email: email, password: password})
    .catch(function(err){
      console.log(err);
    })
    console.log('successfully added', username, email, 'and', password, 'to database');
}