module.exports = function updateUsername(userID, username, knex) {
  return new Promise((resolve, reject) => {
    knex('users')
      .where('id', '=', userID)
      .update({
        username: username
       })
      .then(function() {
        resolve();
      })
      .catch(function(err){
        reject(err);
      })
  })
}