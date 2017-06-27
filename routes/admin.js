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
const createPlayer = require('../db/dbFunc/createPlayer');
const getPlayerInfo = require('../db/dbFunc/getPlayerInfo');

const positions = ['QB', 'RB', 'WR', 'TE', 'K', 'DST', 'DL', 'LB', 'DB', 'DE', 'DT', 'CB', 'S'];
const teams = ['ARI', 'ATL', 'BAL', 'BUF', 'CAR', 'CHI', 'CIN', 'CLE', 'DAL', 'DEN', 'GB', 'CB', 'HOU', 'IND', 'JAC', 'KC', 'LAC', 'LAR', 'MIA', 'MIN', 'NYG', 'NYJ', 'NE', 'NO', 'OAK', 'PHI', 'PIT', 'SF', 'SEA', 'TB', 'TEN', 'WSH'];


module.exports = (knex) => {

  router.use(cookieSession({
    name: 'session',
    secret: 'urlshy5hdyjtid'
  }))

  router.get('/admin', (req, res) => {
    if (req.session.adminName){
      const validate = validateUniqueUsername(req.session.adminName, knex);
      validate.then(function(validateResults){
        if (!validateResults) {
          const queryPlayers = getPlayers(positions, knex);
          queryPlayers.then(function(players){
            res.render('admin/index', {players: players, positions: positions});
          });
        } else {
          res.redirect('/admin/login');
        }
      });
    } else {
      res.redirect('/admin/login');
    }
  });

  router.get('/admin/playeradp', (req, res) => {
    if (req.session.adminName){
      const validate = validateUniqueUsername(req.session.adminName, knex);
      validate.then(function(validateResults){
        if (!validateResults) {
          const queryPlayers = getPlayers(positions, knex);
          queryPlayers.then(function(players){
            res.render('admin/playerADP', {players: players, positions: positions, teams: teams});
          });
        } else {
          res.redirect('/admin/login');
        }
      });
    } else {
      res.redirect('/admin/login');
    }
  });

  router.post('/admin/playeradp', (req, res) => {
    if (req.session.adminName){
      const validate = validateUniqueUsername(req.session.adminName, knex);
      validate.then(function(validateResults){
        if (!validateResults) {
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
        } else {
          res.redirect('/admin/login');
        }
      });
    } else {
      res.redirect('/admin/login');
    }
  });

  router.get('/admin/players', (req, res) => {
    if (req.session.adminName){
      const validate = validateUniqueUsername(req.session.adminName, knex);
      validate.then(function(validateResults){
        if (!validateResults) {
          const queryPlayers = getPlayers(positions, knex);
          queryPlayers.then(function(players){
            res.render('admin/players', {players: players, positions: positions, teams: teams});
          });
        } else {
          res.redirect('/admin/login');
        }
      });
    } else {
      res.redirect('/admin/login');
    }
  });

  router.post('/admin/players/new', (req, res) => {
    if (req.session.adminName){
      const validate = validateUniqueUsername(req.session.adminName, knex);
      validate.then(function(validateResults){
        if (!validateResults) {
          const addPlayer = createPlayer(req.body, knex);
          addPlayer;
          res.redirect('/admin/players');
        } else {
          res.redirect('/admin/login');
        }
      });
    } else {
      res.redirect('/admin/login');
    }
  });

  router.get('/admin/players/:playerID', (req, res) => {
    if (req.session.adminName){
      const validate = validateUniqueUsername(req.session.adminName, knex);
      validate.then(function(validateResults){
        if (!validateResults) {
          const playerInfo = getPlayerInfo(req.params.playerID, knex);
          playerInfo.then(function(player){
            console.log(player);
            res.render('admin/viewPlayer', {player: player, positions: positions, teams: teams});
          });
        } else {
          res.redirect('/admin/login');
        }
      });
    } else {
      res.redirect('/admin/login');
    }
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
