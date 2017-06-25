module.exports = function updateEmail(username, email, knex) {
  return new Promise((resolve, reject) => {
    knex('users')
      .where('username', '=', username)
      .update({
        email: email
       })
      .then(function() {
        resolve();
      })
      .catch(function(err){
        reject(err);
      })
  })
}