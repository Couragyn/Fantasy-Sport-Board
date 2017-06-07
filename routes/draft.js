'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const viewLeagueInfo = require('../db/dbFunc/getLeagueInfo');
const getCurrentYear = require('../helpers/getCurrentYear');
const createDraft = require("../db/dbFunc/createDraft");
const createDraftPicks = require("../db/dbFunc/createDraftPicks");

module.exports = (knex) => {

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
