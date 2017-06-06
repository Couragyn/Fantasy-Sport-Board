
exports.seed = function(knex, Promise) {
  const csv=require('csvtojson');
  let qb_obj = [];
  let rb_obj = [];
  let wr_obj = [];
  let te_obj = [];
  let k_obj = [];
  let dst_obj = [];
  let db_obj = [];
  let dl_obj = [];
  let lb_obj = [];
  // Reads players for csv sheets
  csv()
    .fromFile(__dirname+'/seed_files/qb.csv')
    .on('json',(jsonObj)=>{
      qb_obj.push({name: jsonObj.f_name+' '+jsonObj.l_name, position: 'QB', team: jsonObj.team, rookie: jsonObj.rookie, position_adp: jsonObj.rank});
    })

  csv()
    .fromFile(__dirname+'/seed_files/rb.csv')
    .on('json',(jsonObj)=>{
      rb_obj.push({name: jsonObj.f_name+' '+jsonObj.l_name, position: 'RB', team: jsonObj.team, rookie: jsonObj.rookie, position_adp: jsonObj.rank});
    })

  csv()
    .fromFile(__dirname+'/seed_files/wr.csv')
    .on('json',(jsonObj)=>{
      wr_obj.push({name: jsonObj.f_name+' '+jsonObj.l_name, position: 'WR', team: jsonObj.team, rookie: jsonObj.rookie, position_adp: jsonObj.rank});
    })

  csv()
    .fromFile(__dirname+'/seed_files/te.csv')
    .on('json',(jsonObj)=>{
      te_obj.push({name: jsonObj.f_name+' '+jsonObj.l_name, position: 'TE', team: jsonObj.team, rookie: jsonObj.rookie, position_adp: jsonObj.rank});
    })

  csv()
    .fromFile(__dirname+'/seed_files/k.csv')
    .on('json',(jsonObj)=>{
      k_obj.push({name: jsonObj.f_name+' '+jsonObj.l_name, position: 'K', team: jsonObj.team, rookie: jsonObj.rookie, position_adp: jsonObj.rank});
    })

  csv()
    .fromFile(__dirname+'/seed_files/dst.csv')
    .on('json',(jsonObj)=>{
      dst_obj.push({name: jsonObj.f_name+' '+jsonObj.l_name, position: 'DST', team: jsonObj.team, rookie: jsonObj.rookie, position_adp: jsonObj.rank});
    })

  csv()
    .fromFile(__dirname+'/seed_files/db.csv')
    .on('json',(jsonObj)=>{
      db_obj.push({name: jsonObj.f_name+' '+jsonObj.l_name, position: 'DB', team: jsonObj.team, rookie: jsonObj.rookie, position_adp: jsonObj.rank});
    })

  csv()
    .fromFile(__dirname+'/seed_files/dl.csv')
    .on('json',(jsonObj)=>{
      dl_obj.push({name: jsonObj.f_name+' '+jsonObj.l_name, position: 'DL', team: jsonObj.team, rookie: jsonObj.rookie, position_adp: jsonObj.rank});
    })

  csv()
    .fromFile(__dirname+'/seed_files/lb.csv')
    .on('json',(jsonObj)=>{
      lb_obj.push({name: jsonObj.f_name+' '+jsonObj.l_name, position: 'LB', team: jsonObj.team, rookie: jsonObj.rookie, position_adp: jsonObj.rank});
   })

  // adds players to db
  return knex('player').del()
    .then(function () {
      return Promise.all([
        knex('player').insert(qb_obj),
        knex('player').insert(rb_obj),
        knex('player').insert(wr_obj),
        knex('player').insert(te_obj),
        knex('player').insert(k_obj),
        knex('player').insert(dst_obj),
        knex('player').insert(db_obj),
        knex('player').insert(dl_obj),
        knex('player').insert(lb_obj)
      ]);
    });
};
