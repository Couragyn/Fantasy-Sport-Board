// pulls up the league settings info
module.exports = function getDraftInfo(draftID, knex) {
  return new Promise((resolve, reject) => {
    // Selects the general league settings
    knex.select('*').from('draft')
      .where('id', '=', draftID)
      .asCallback(function(err, rows) {
        if (err) return reject(err);
        resolve(rows[0]);
      })
  })
}
