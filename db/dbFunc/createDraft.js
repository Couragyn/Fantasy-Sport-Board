// adds the form data for a new league to the db
module.exports = function createDraft(draft, knex) {
  return new Promise((resolve, reject) => {
    knex('draft').insert(draft)
      .returning('id')
      .then(function(draftID) {
        resolve(draftID);
      })
      .catch(function(err){
        console.log(err);
      })
  })
}
