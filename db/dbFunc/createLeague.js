// adds the form data for a new league to the db
module.exports = function createLeague(league, knex) {
  knex('league').insert({CB: league.CB, DB: league.DB, DE: league.DE, DL: league.DL, DST: league.DST, DT: league.DT, IDP: league.IDP, K: league.K, LB: league.LB, QB: league.QB, QB_WR_RB_TE: league.QB_WR_RB_TE, RB: league.RB, RB_TE: league.RB_TE, RB_WR: league.RB_WR, RB_WR_TE: league.RB_WR_TE, S: league.S, TE: league.TE, WR: league.WR, WR_TE: league.WR_TE, bench: league.bench, keepers: league.keepers, name: league.name, positions: league.positions, scoring: league.scoring, size: league.size, type: league.type})
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
          })
      }
    })
    .catch(function(err){
      console.log(err);
    })
}

