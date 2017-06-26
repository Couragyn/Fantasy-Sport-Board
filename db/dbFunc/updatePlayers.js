// Updates the player rankings
module.exports = function updatePlayers(ranking, knex) {
  for (let i = 0; i < ranking.length; i++) {
  console.log(ranking[i]);
  console.log(i+1);

    knex('player')
      .where('id', '=', ranking[i])
      .update({position_adp: i+1})
      .catch(function(err){
        console.log(err);;
      })
  }
}
