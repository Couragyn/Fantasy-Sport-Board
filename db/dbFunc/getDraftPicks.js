// pulls the draft pick data
module.exports = function getDraftPicks(draftID, knex) {
  return new Promise((resolve, reject) => {
    // Selects the general league settings
    knex.select('*').from('draft_picks').leftJoin('team', 'draft_picks.team_id', 'team.id')
      .where('draft_id', '=', draftID)
      .orderBy('round')
      .orderBy('pick')
      .asCallback(function(err, rows) {
        if (err) return reject(err);
        resolve(rows);
      })
  })
}
