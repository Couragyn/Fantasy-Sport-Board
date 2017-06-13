module.exports = function validateUniqueUsername(username, knex) {
  return new Promise((resolve, reject) => {
    knex.select('*').from('users')
    .where('username', '=', username)
    .asCallback(function(err, rows) {
      if (err) return reject(err);
        if (rows.length < 1) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
   });
}
