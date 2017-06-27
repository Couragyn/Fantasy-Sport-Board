module.exports = function getUser(username, knex) {
 return new Promise((resolve, reject) => {
    knex.select('id').from('admin')
    .where('username', '=', username)
    .asCallback(function(err, rows) {
      if (err) return reject(err);
      resolve(rows[0].id);
    })
  })
}
