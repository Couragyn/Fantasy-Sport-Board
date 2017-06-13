// adds the form data for a new league to the db. Also creates as many teams as the league size
module.exports = function createLeague(league, knex) {
  return new Promise((resolve, reject) => {
    knex('league').insert(league)
      .returning('id')
      .then(function(leagueID) {
        for (let i = 1; i <= league.size; i++) {
          knex('team').insert({name: 'Team '+i, draft_position: i, league_id: leagueID[0]})
            .then(function() {
              resolve(leagueID);
            })
        }
      })
      .catch(function(err){
        resolve(err);
      })
  })
}

