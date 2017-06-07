// Creates a new draft for the league. Also sets up the picks based on the league settings
module.exports = function createDraft(draftID, knex) {
  return new Promise((resolve, reject) => {
    knex.select('draft.draft_type', 'draft.rounds', 'team.id', 'team.draft_position').from('draft').join('team', 'draft.league_id', 'team.league_id')
      .where('draft.id', '=', draftID)
      .orderBy('team.draft_position')
      .asCallback(function(err, rows) {
        if (err) return reject(err);
        // If it is a standard draft, it will assign picks according to draft order
        if (rows[0].draft_type === 'Standard') {
          for (let round = 1; round <= rows[0].rounds; round++) {
            for(let pick = 1; pick <= rows.length; pick++) {
              knex('draft_picks').insert({draft_id: draftID, round: round, pick: pick, team_id: rows[pick-1].id})
              .catch(function(err){
                console.log(err);
              })
            }
          }
           // If it is a snake draft, it will assign picks according to draft order on odd rounds, and reverse order on even rounds
        } else if (rows[0].draft_type === 'Snake') {
          for (let round = 1; round <= rows[0].rounds; round += 2) {
            for(let pick = 1; pick <= rows.length; pick++) {
              knex('draft_picks').insert({draft_id: draftID, round: round, pick: pick, team_id: rows[pick-1].id})
              .catch(function(err){
                console.log(err);
              })
            }
          }
          for (let round = 2; round <= rows[0].rounds; round += 2) {
            // Keeps track of the teams in draft position, while the loop goes through backwards. Resets each round
            let team = 0;
            for(let pick = rows.length; pick >= 1; pick--) {
              knex('draft_picks').insert({draft_id: draftID, round: round, pick: pick, team_id: rows[pick-1].id})
              .catch(function(err){
                console.log(err);
              })
              team++;
            }
          }
        } else {
          return reject('draft type does not exist');
        }
        resolve();
      })
  })
}
