module.exports = function validateLogin(username, knex) {
  return new Promise((resolve, reject) => {
    knex.select('*').from('users')
    .where('username', '=', username)   
    .asCallback(function(err, rows) {
      if (err) return reject(err);
        resolve(rows[0].password); 
      });
   });
}