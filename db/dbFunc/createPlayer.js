// adds a player with greatest adp
module.exports = function createPlayer(playerData, knex) {
  if (playerData.rookie) {
    var rookie = true;
  } else {
    var rookie = false;
  }
  knex('player').max('position_adp')
    .asCallback(function(err, rows) {
      if (err) return (err);
      knex('player').insert({name: playerData.name, position: playerData.position, team: playerData.team, rookie: rookie, position_adp: rows[0].max+1})
        .catch(function(err){
          console.log(err);
        })
    })
}

