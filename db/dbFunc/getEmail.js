module.exports = function getEmail(userID, knex) {
 return new Promise((resolve, reject) => {
    knex.select('email').from('users')
    .where('id', '=', userID)
    .asCallback(function(err, rows) {
      if (err) return reject(err);
      resolve(rows[0].email);
    })
  })
}