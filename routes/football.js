'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

module.exports = (knex) => {

  router.use(cookieSession({
        name: 'session',
        secret: 'urlshy5hdyjtid'
    }))

  router.get('/football', (req, res) => {
    res.render('football/index', {user: req.session.user_id});
  });

  return router;
}
