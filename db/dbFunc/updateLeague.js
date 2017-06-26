// Updates the league info
module.exports = function updateLeague(leagueID, league, knex) {
  return new Promise((resolve, reject) => {
    knex('league')
      .where('id', '=', leagueID)
      .update(league)
      .then(function() {
        resolve();
      })
      .catch(function(err){
        reject(err);
      })
  })
}
