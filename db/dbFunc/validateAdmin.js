const bcrypt = require('bcrypt');

module.exports = function validateLogin(username, knex) {
  return new Promise((resolve, reject) => {
    knex.select('*').from('admin')
    .where('username', '=', username)
    .asCallback(function(err, rows) {
      if (err) return reject(err);
      resolve(rows[0].password);
      });
   });
}
