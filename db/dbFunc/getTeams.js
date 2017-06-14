// returns the team information for a league
module.exports = function getTeams(leagueID, knex) {
  teamsData = [];
  return new Promise((resolve, reject) => {
    knex.select('team.id', 'name', 'draft_position', 'user_id', 'username').from('team').leftJoin('users', 'users.id', 'team.user_id')
      .where('league_id', '=', leagueID)
      .orderBy('draft_position')
      .asCallback(function(err, rows) {
        if (err) return reject(err);
        resolve(rows);
      })
  })
}
