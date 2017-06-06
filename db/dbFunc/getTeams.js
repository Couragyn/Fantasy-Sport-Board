// returns the team information for
module.exports = function viewLeague(leagueID, knex) {
  teamsData = [];
  return new Promise((resolve, reject) => {
    knex.select('team_id', 'name', 'draft_position').from('league_team').rightJoin('team', 'league_team.team_id', 'team.id')
      .where('league_id', '=', leagueID)
      .orderBy('draft_position')
      .asCallback(function(err, rows) {
        if (err) return reject(err);
        resolve(rows);
      })
  })
}
