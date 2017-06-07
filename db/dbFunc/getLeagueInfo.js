// pulls up the information for viewing a league. Separates it into league data and league positions
module.exports = function getLeagueInfo(leagueID, knex) {
  return new Promise((resolve, reject) => {
    // Selects the general league settings
    knex.select('id', 'commish_id', 'name', 'size', 'scoring', 'type', 'keepers', 'positions').from('league')
      .where('id', '=', leagueID)
      .asCallback(function(err, rows) {
        if (err) return reject(err);
        resolve(rows[0])
      })
  })
}
