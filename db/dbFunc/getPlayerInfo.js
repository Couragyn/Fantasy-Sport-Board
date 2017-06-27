// returns the players at requested positions
module.exports = function getPlayers(playerID, knex) {
  return new Promise((resolve, reject) => {
    knex.select('id', 'name', 'position', 'team', 'rookie').from('player')
      .where('id', '=', playerID)
      .asCallback(function(err, rows) {
        if (err) return reject(err);
        resolve(rows[0]);
      })
  })
}
