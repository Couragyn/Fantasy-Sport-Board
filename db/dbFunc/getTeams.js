// returns the team information for a league
module.exports = function getTeams(leagueID, knex) {
  teamsData = [];
  return new Promise((resolve, reject) => {
    knex.select('id', 'name', 'draft_position').from('team')
      .where('league_id', '=', leagueID)
      .orderBy('draft_position')
      .asCallback(function(err, rows) {
        if (err) return reject(err);
        resolve(rows);
      })
  })
}
