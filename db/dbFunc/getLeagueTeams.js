// pulls up the user IDs for all claimed teams in a league
module.exports = function getLeagueTeams(leagueID, knex) {
  return new Promise((resolve, reject) => {
    let userIDs = [];
    let takenTeams = [];
    knex.select('id', 'user_id').from('team')
      .where('league_id', '=', leagueID)
      .whereNotNull('user_id')
      .asCallback(function(err, rows) {
        if (err) return reject(err);
        for (let i = 0; i < rows.length; i++) {
          userIDs.push(rows[i].user_id);
          takenTeams.push(rows[i].id);
        }
        resolve({userIDs: userIDs, takenTeams: takenTeams});
      })
  })
}
