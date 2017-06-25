module.exports = function updatePassword(userID, password, knex) {
  return new Promise((resolve, reject) => {
    knex('users')
      .where('id', '=', userID)
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