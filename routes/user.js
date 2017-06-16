'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const createNewUser = require('../db/dbFunc/createNewUser');
const validateUniqueUsername = require('../db/dbFunc/validateUniqueUsername');
const validateLogin= require('../db/dbFunc/validateLogin');
const getUserTeams = require("../db/dbFunc/getUserTeams");
const getCommishTeams = require("../db/dbFunc/getCommishTeams");

module.exports = (knex) => {

  router.use(cookieSession({
    name: 'session',
    secret: 'urlshy5hdyjtid'
  }))

  router.get('/user/:userID', (req, res) => {
    if (parseInt(req.session.userID) == req.params.userID) {
      let userTeams = getUserTeams(req.params.userID, knex);
      userTeams.then(function(ownedTeams) {
        let commishTeams = getCommishTeams(req.params.userID, knex);
        commishTeams.then(function(createdTeams) {
          res.render('user/view', {userID: req.session.userID, username: req.session.username, ownedTeams: ownedTeams, createdTeams: createdTeams});
        })
      })
    } else {
      res.redirect('/football');
    }
  });

 return router;
}
