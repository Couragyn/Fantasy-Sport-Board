'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const positionBuilder = require("../helpers/positionBuilder");
const addLeague = require("../db/dbFunc/createLeague");
const viewLeagueInfo = require('../db/dbFunc/getLeagueInfo');
const viewLeaguePositions = require('../db/dbFunc/getLeaguePositions');
const getTeams = require('../db/dbFunc/getTeams');
const getCurrentYear = require('../helpers/getCurrentYear');
const createDraft = require("../db/dbFunc/createDraft");
const createDraftPicks = require("../db/dbFunc/createDraftPicks");



module.exports = (knex) => {

  router.get('/football', (req, res) => {
    res.render('football/index');
  });

  router.get('/football/league', (req, res) => {
    res.render('football/league/index');
  });


  router.get('/football/league/create', (req, res) => {
    res.render('football/league/create');
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
          res.render("football/league/view", {leagueData: leagueData, leaguePositions: leaguePositions, teamData: teamData});
        })
      })
    })
  });

  router.get("/football/league/:leagueID/draft/create", (req, res) => {
    let getLeagueInfo = viewLeagueInfo(req.params.leagueID, knex);
    getLeagueInfo.then(function(leagueData){
      res.render("football/draft/create", {leagueData: leagueData});
    })
  });

  router.post("/football/league/:leagueID/draft/create", (req, res) => {
    let draftDate = null;
    if (req.body.date) {
      draftDate = req.body.date;
    }
    const newDraft = {
      league_id: req.params.leagueID,
      year: getCurrentYear(),
      rounds: req.body.rounds,
      draft_type: req.body.draftType,
      rookie: req.body.rookie,
      start_type: req.body.start,
      date_time: draftDate
    }
    let addDraft = createDraft(newDraft, knex);
    addDraft.then(function(draftID) {
      let makeDraftPicks = createDraftPicks(draftID[0], knex);
      makeDraftPicks.then(function() {
        res.redirect(draftID[0]);
      })
    })
  });

  router.get("/football/league/:leagueID/draft/:draftID", (req, res) => {
    res.render("football/draft/view");
  });

  return router;
}
