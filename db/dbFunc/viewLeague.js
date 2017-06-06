// pulls up the information for viewing a league. Separates it into league data and league positions
module.exports = function viewLeague(leagueID, knex) {
  return new Promise((resolve, reject) => {
    // Selects the general league settings
    knex.select('id', 'commish_id', 'name', 'size', 'scoring', 'type', 'keepers', 'positions').from('league')
      .where('id', '=', leagueID)
      .asCallback(function(err, rows) {
        if (err) return reject(err);
        // Selects the position data
        knex.select('QB', 'RB', 'WR', 'TE', 'RB_WR_TE', 'RB_TE', 'WR_TE', 'QB_WR_RB_TE', 'RB_WR', 'K', 'DST', 'DL', 'LB', 'DB', 'DE', 'DT', 'CB', 'S', 'IDP', 'Bench').from('league')
          .where('id', '=', leagueID)
          .asCallback(function(err, rows2) {
            if (err) return reject(err);
            // Removes positions that are not used in the league
            for (let key in rows2[0]){
              if (rows2[0][key] < 1) {
                delete rows2[0][key];
              }
            }
            resolve({league: rows[0], positions: rows2[0]})
          })
      })
  })
}
