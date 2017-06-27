// Updates the player rankings
module.exports = function updatePlayer(playerID, player, knex) {
  knex('player')
    .where('id', '=', playerID)
    .update(player)
    .catch(function(err){
      console.log(err);;
    })
}
