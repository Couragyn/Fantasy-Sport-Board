module.exports = function getUserTeams(userID, knex) {
 return new Promise((resolve, reject) => {
   knex.select('team.id as team_id', 'team.league_id', 'team.name as team_name', 'league.name as league_name', 'team.draft_position').from('team').leftJoin('league', 'league.id', 'team.league_id')
    .where('team.user_id', '=', userID)
    .asCallback(function(err, rows) {
      if (err) return reject(err);
      resolve(rows);
    })
  })
}
