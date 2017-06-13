module.exports = function getUserTeams(userID, knex) {
 return new Promise((resolve, reject) => {
   knex.select('*').from('user_teams').leftJoin('team', 'user_teams.team_id', 'team.id').leftJoin('league', 'league.id', 'team.league_id')
    .where('user_teams.user_id', '=', userID)
    .asCallback(function(err, rows) {
      if (err) return reject(err);
      console.log(rows);
      resolve(rows);
    })
  })
}
