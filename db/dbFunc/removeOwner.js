// removes the userID from a team
module.exports = function addTeam(teamID, knex) {
  return new Promise((resolve, reject) => {
    knex('team')
      .where('id', '=', teamID)
      .update({user_id: null})
      .then(function() {
        resolve();
      })
      .catch(function(err){
        reject(err);
      })
  })
}
