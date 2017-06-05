"use strict";

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const positionBuilder = require("../helpers/positionBuilder");
const addLeague = require("../db/dbFunc/createLeague");
const viewLeague   = require('../db/dbFunc/viewLeague');



module.exports = (knex) => {

  router.get("/football", (req, res) => {
    res.render("football/index");
  });

  router.get("/football/league", (req, res) => {
    res.render("football/league/index");
  });


  router.get("/football/league/create", (req, res) => {
    res.render("football/league/create");
  });

  router.post("/football/league/create", (req, res) => {

    // Gets the positions used for his league
    let leaguePositions = positionBuilder(req.body);

    // sets the form data to a JSON object
    const newLeague = {
      name: req.body.name,
      size: req.body.size,
      scoring: req.body.scoring,
      type: req.body.type,
      keepers: req.body.keepers,
      QB: req.body.qb,
      RB: req.body.rb,
      WR: req.body.wr,
      TE: req.body.te,
      RB_WR_TE: req.body.rb_wr_te,
      RB_TE: req.body.rb_te,
      WR_TE: req.body.wr_te,
      QB_WR_RB_TE: req.body.qb_wr_rb_te,
      RB_WR: req.body.rb_wr,
      K: req.body.k,
      DST: req.body.dst,
      DL: req.body.dl,
      LB: req.body.lb,
      DB: req.body.db,
      DE: req.body.de,
      DT: req.body.dt,
      CB: req.body.cb,
      S: req.body.s,
      IDP: req.body.idp,
      bench: req.body.bench,
      positions: leaguePositions
    }
    addLeague(newLeague, knex);
    res.render("football/index.ejs");
  });

  router.get("/football/league/:leagueID", (req, res) => {
    let getLeague = viewLeague(req.params.leagueID, knex);
    getLeague.then(function(data){
      res.render("football/league/view", {data: data});
    })
  });

  return router;
}
