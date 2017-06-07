'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const positionBuilder = require("../helpers/positionBuilder");
const addLeague = require("../db/dbFunc/createLeague");
const viewLeagueInfo = require('../db/dbFunc/getLeagueInfo');
const viewLeaguePositions = require('../db/dbFunc/getLeaguePositions');
const getTeams = require('../db/dbFunc/getTeams');
const cookieSession = require('cookie-session');

module.exports = (knex) => {

  router.use(cookieSession({
        name: 'session',
        secret: 'urlshy5hdyjtid'
    }))

  router.get('/football/league', (req, res) => {
    res.render('football/league/index', {user: req.session.user_id});
  });

  router.get('/football/league/create', (req, res) => {
    res.render('football/league/create', {user: req.session.user_id});
  });

  router.post('/football/league/create', (req, res) => {
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
      Bench: req.body.Bench,
      positions: leaguePositions
    }
    let leagueID = addLeague(newLeague, knex);
    leagueID.then(function(leagueID) {
      res.redirect('/football/league/'+leagueID);
    });
  });

  router.get("/football/league/:leagueID", (req, res) => {
    let getLeagueInfo = viewLeagueInfo(req.params.leagueID, knex);
    getLeagueInfo.then(function(leagueData){
      let getLeaguePositons = viewLeaguePositions(req.params.leagueID, knex);
      getLeaguePositons.then(function(leaguePositions) {
        let retrieveTeams = getTeams(req.params.leagueID, knex);
        retrieveTeams.then(function(teamData) {
          res.render("football/league/view", {user: req.session.user_id, leagueData: leagueData, leaguePositions: leaguePositions, teamData: teamData});
        })
      })
    })
  });

  return router;
}
