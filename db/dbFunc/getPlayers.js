// returns the players at requested positions
module.exports = function getPlayers(positions, knex) {
  return new Promise((resolve, reject) => {
    knex.select('*').from('player')
      .whereIn('position', positions)
      .orderBy('position', 'asc')
      .orderBy('position_adp', 'asc')
      .asCallback(function(err, rows) {
        if (err) return reject(err);
        resolve(rows);
      })
  })
}
