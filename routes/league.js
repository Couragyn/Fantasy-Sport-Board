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
const addTeamUser = require('../db/dbFunc/addTeamUser');
const getLeagueDraftInfo = require("../db/dbFunc/getLeagueDraftInfo");
const getLeagueTeams = require("../db/dbFunc/getLeagueTeams");

module.exports = (knex) => {

  router.use(cookieSession({
        name: 'session',
        secret: 'urlshy5hdyjtid'
    }))

  router.get('/football/league', (req, res) => {
    res.render('football/league/index', {userID: req.session.userID, username: req.session.username});
  });

  router.get('/football/league/create', (req, res) => {
    if (req.session.userID) {
      res.render('football/league/create', {userID: req.session.userID, username: req.session.username});
    } else {
      res.redirect('/login');
    }
  });

  router.post('/football/league/create', (req, res) => {
    if (req.session.userID) {
      // Gets the positions used for his league
      let leaguePositions = positionBuilder(req.body);

      // sets the form data to a JSON object
      const newLeague = {
        name: req.body.name,
        password: req.body.password,
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
        positions: leaguePositions,
        commish_id: parseInt(req.session.userID)
      }
      let leagueID = addLeague(newLeague, knex);
      leagueID.then(function(leagueID) {
        res.redirect('/football/league/'+leagueID);
      });
    } else {
      res.redirect('/login');
    }
  });

  router.get("/football/league/:leagueID", (req, res) => {
    let getLeagueInfo = viewLeagueInfo(req.params.leagueID, knex);
    getLeagueInfo.then(function(leagueData){
      let getLeaguePositons = viewLeaguePositions(req.params.leagueID, knex);
      getLeaguePositons.then(function(leaguePositions) {
        let retrieveTeams = getTeams(req.params.leagueID, knex);
        retrieveTeams.then(function(teamData) {
          let leagueDraftInfo = getLeagueDraftInfo(req.params.leagueID, knex);
          leagueDraftInfo.then(function(draftInfo) {
            let leagueTeams = getLeagueTeams(req.params.leagueID, knex);
            leagueTeams.then(function(teams) {
              res.render("football/league/view", {userID: req.session.userID, username: req.session.username, draftData: draftInfo, leagueData: leagueData, leaguePositions: leaguePositions, teamData: teamData, takenTeams: teams.userIDs});
            })
          })
        })
      })
    })
  });

  router.get("/football/league/:leagueID/claim/:teamID", (req, res) => {
    if (req.session.userID) {
      let leagueTeams = getLeagueTeams(req.params.leagueID, knex);
      leagueTeams.then(function(teams) {
        let takenTeams = teams.takenTeams
        if (!takenTeams.includes(parseInt(req.params.teamID))) {
          res.render('football/league/claim', {userID: req.session.userID, username: req.session.username, leagueID: req.params.leagueID, teamID: req.params.teamID});
        } else {
          res.redirect('/football/league/'+req.params.leagueID);
        }
      })
    } else {
      res.redirect('/login');
    }
  });

  router.post("/football/league/:leagueID/claim/:teamID", (req, res) => {
    if (req.session.userID) {
      let leagueTeams = getLeagueTeams(req.params.leagueID, knex);
      leagueTeams.then(function(teams) {
        let takenTeams = teams.takenTeams
        if (!takenTeams.includes(parseInt(req.params.teamID))) {
          let getLeagueInfo = viewLeagueInfo(req.params.leagueID, knex);
          getLeagueInfo.then(function(leagueData){
            if(leagueData.password === req.body.password) {
              let addTeam = addTeamUser(req.params.teamID,  parseInt(req.session.userID), knex);
              addTeam.then(function(){
                res.redirect('/football/league/'+req.params.leagueID);
              })
            } else {
              res.redirect('/football/league/${parseInt(req.params.leagueID)}/claim/${parseInt(req.params.teamID)}');
            }
          })
        } else {
          res.redirect('/football/league/'+req.params.leagueID);
        }
      })
    } else {
      res.redirect('/login');
    }
  });

  return router;
}
