module.exports = function getCommishTeams(commishID, knex) {
 return new Promise((resolve, reject) => {
   knex.select('name', 'size', 'scoring', 'type').from('league')
    .where('commish_id', '=', commishID)
    .asCallback(function(err, rows) {
      if (err) return reject(err);
      resolve(rows);
    })
  })
}
