// adds the form data for a new league to the db
module.exports = function addTeam(teamID, userID, knex) {
  return new Promise((resolve, reject) => {
    knex('team')
      .where('id', '=', teamID)
      .update({user_id: userID})
      .then(function() {
        resolve();
      })
      .catch(function(err){
        console.log(err);
      })
  })
}
