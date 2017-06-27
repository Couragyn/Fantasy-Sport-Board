// removes a player
module.exports = function removePlayer(playerID, knex) {
  return new Promise((resolve, reject) => {
    knex('player')
      .where('id', '=', playerID)
      .del()
      .then(function() {
        resolve();
      })
      .catch(function(err){
        reject(err);
      })
  })
}
