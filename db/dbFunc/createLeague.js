// adds the form data for a new league to the db
module.exports = function createLeague(league, knex) {
  return new Promise((resolve, reject) => {
    knex('league').insert(league)
      .returning('id')
      .then(function(leagueID) {
        for (let i = 1; i <= league.size; i++) {
          knex('team').insert({name: 'Team '+i, draft_position: i})
            .returning('id')
            .then(function(teamID) {
              knex('league_team').insert({league_id: leagueID[0], team_id: teamID[0]})
                .catch(function(err){
                  console.log(err);
                })
              resolve(leagueID);
            })
        }
      })
      .catch(function(err){
        console.log(err);
      })
  })
}

