'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const createNewUser = require('../db/dbFunc/createNewUser');
const validateUniqueUsername = require('../db/dbFunc/validateUniqueUsername');
const validateLogin= require('../db/dbFunc/validateLogin');
const getUserTeams = require("../db/dbFunc/getUserTeams");

module.exports = (knex) => {

  router.use(cookieSession({
    name: 'session',
    secret: 'urlshy5hdyjtid'
  }))

  router.get('/user/:userID', (req, res) => {
    let userTeams = getUserTeams(1, knex);
    userTeams.then(function(userTeam) {
      console.log(userTeam);
    })

  });

 return router;
}
