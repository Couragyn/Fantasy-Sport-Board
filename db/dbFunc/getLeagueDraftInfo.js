// pulls up the league settings info
module.exports = function getDraftInfo(leagueID, knex) {
  return new Promise((resolve, reject) => {
    // Selects the general league settings
    knex.select('*').from('draft')
      .where('league_id', '=', leagueID)
      .orderBy('id', 'desc')
      .asCallback(function(err, rows) {
        if (err) return reject(err);
        resolve(rows);
      })
  })
}


