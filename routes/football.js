'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get('/football', (req, res) => {
    res.render('football/index');
  });

  return router;
}
