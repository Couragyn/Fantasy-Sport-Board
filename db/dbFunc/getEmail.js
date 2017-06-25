module.exports = function getEmail(username, knex) {
 return new Promise((resolve, reject) => {
    knex.select('email').from('users')
    .where('username', '=', username)
    .asCallback(function(err, rows) {
      if (err) return reject(err);
      resolve(rows[0].email);
    })
  })
}