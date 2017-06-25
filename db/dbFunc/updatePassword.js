module.exports = function updatePassword(username, password, knex) {
  return new Promise((resolve, reject) => {
    knex('users')
      .where('username', '=', username)
      .update({
        password: password
       })
      .then(function() {
        resolve();
      })
      .catch(function(err){
        reject(err);
      })
  })
}