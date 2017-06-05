module.exports = function createLeague(username, password, knex) {
  knex('league').insert({username: username, password: password})
    .catch(function(err){
      console.log(err);
    })
}