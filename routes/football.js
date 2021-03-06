'use strict';

require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const getUserTeams = require('../db/dbFunc/getUserTeams');

module.exports = (knex) => {

  router.use(cookieSession({
        name: 'session',
        secret: process.env.SECRET
    }))

  router.get('/football', (req, res) => {
    res.render('football/index', {userID: req.session.userID, username: req.session.username});
  });

  return router;
}
