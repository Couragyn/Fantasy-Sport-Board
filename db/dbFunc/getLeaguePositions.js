// returns the league position information
module.exports = function getLeaguePositions(leagueID, knex) {
  return new Promise((resolve, reject) => {
    knex.select('QB', 'RB', 'WR', 'TE', 'RB_WR_TE', 'RB_TE', 'WR_TE', 'QB_WR_RB_TE', 'RB_WR', 'K', 'DST', 'DL', 'LB', 'DB', 'DE', 'DT', 'CB', 'S', 'IDP', 'Bench').from('league')
      .where('id', '=', leagueID)
      .asCallback(function(err, rows) {
        if (err) return reject(err);
        // Removes positions that are not used in the league
        for (let key in rows[0]){
          if (rows[0][key] < 1) {
            delete rows[0][key];
          }
        }
        resolve(rows[0]);
      })
  })
}
