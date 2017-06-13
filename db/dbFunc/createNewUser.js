module.exports = function createNewUser(username, email, password, knex) {
  return new Promise((resolve, reject) => {
    knex('users').insert({username: username, email: email, password: password})
      .returning('id')
      .then(function(userID) {
        resolve(userID);
      })
      .catch(function(err){
        resolve(err);
      })
  })
}
