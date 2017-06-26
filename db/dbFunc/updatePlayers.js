// Updates the player rankings
module.exports = function createLeague(leagueID, league, knex) {
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
