module.exports = function updateEmail(userID, email, knex) {
  return new Promise((resolve, reject) => {
    knex('users')
      .where('id', '=', userID)
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