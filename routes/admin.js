'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const validateLogin= require('../db/dbFunc/validateAdmin');
const validateUniqueUsername = require('../db/dbFunc/validateUniqueAdmin');
const getUserID = require('../db/dbFunc/getAdminID');
const getPlayers = require('../db/dbFunc/getPlayers');
const updatePlayers = require('../db/dbFunc/updatePlayers');
const positions = ['QB', 'RB', 'WR', 'TE', 'K', 'DST', 'DL', 'LB', 'DB', 'DE', 'DT', 'CB', 'S'];

module.exports = (knex) => {

  router.use(cookieSession({
    name: 'session',
    secret: 'urlshy5hdyjtid'
  }))

  router.get('/admin', (req, res) => {
    const queryPlayers = getPlayers(positions, knex);
    queryPlayers.then(function(players){
      res.render('admin/players', {players: players, positions: positions});
    });
  });

  router.post('/admin/players', (req, res) => {
    let updateArray = [];
    let updateObj = {};
    for (let i = 0; i < positions.length; i++) {
      let currPosition = positions[i]
      if (eval(`req.body.${currPosition}`)) {
        let updateArray = eval(`req.body.${currPosition}`).split(',');
        const updateObj = updatePlayers(updateArray, knex);
        updateObj;
      }
    }
    res.redirect('/admin');
  });

  router.get('/admin/login', (req, res) => {
    res.render('admin/login');
  });

  router.post('/admin/login', (req, res) => {

    let username = req.body['username'];
    let password = req.body['password'];
    const validate = validateUniqueUsername(username, knex);
    validate.then(function(validateResults){
      if (validateResults){
        res.redirect('admin/login');
      } else {
        const login = validateLogin(username, knex);
        login.then(function(login){
          if (bcrypt.compareSync(password, login)) {
            const userInfo = getUserID(username, knex);
            userInfo.then(function(userID) {
              req.session.adminID = userID;
              req.session.adminName = username;
              res.redirect('/admin');
            })
          } else {
            res.redirect('admin/login');
          }
        });
      }
    });
  })

 return router;
}
