module.exports = function validateUniqueUsername(username, knex) {
  return new Promise((resolve, reject) => {
    knex.select('*').from('users')
    .where('username', '=', username) 
    .orWhere('username', '=', 'username')     
    .asCallback(function(err, rows) {
      if (err) return reject(err);
        if (rows.length > 1) {
          resolve(rows[1].id);
        } else {
          resolve(rows[0].id);  
        }
      });
   });
}