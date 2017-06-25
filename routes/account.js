'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const updateEmail = require('../db/dbFunc/updateEmail');
const updatePassword = require('../db/dbFunc/updatePassword');
const updateUsername = require('../db/dbFunc/updateUsername');
const validateLogin = require('../db/dbFunc/validateLogin');
const getEmail = require('../db/dbFunc/getEmail');
const validateUniqueUsername = require('../db/dbFunc/validateUniqueUsername');

module.exports = (knex) => {
  
  router.use(cookieSession({
    name: 'session',
    secret: 'urlshy5hdyjtid'
  })) 

  router.get('/account', (req, res) => {
    let email = getEmail(req.session.userID, knex);
    email.then(function(email){
      res.render('user/account', {userID: req.session.userID, username: req.session.username, email: email, uniqueUsername: true});
    })
  });

  router.post('/account/email', (req, res) => {
    updateEmail(req.session.userID, req.body['email'], knex);
    res.redirect('/');
  });

  router.post('/account/username', (req, res) => {
    let newUsername = req.body['username'];
    let email = getEmail(req.session.userID, knex);
    const validate = validateUniqueUsername(newUsername, knex);
    validate.then(function(validateResults){
      if (!validateResults){
        res.status(404);
        email.then(function(email){
          res.render('user/account', {userID: req.session.userID, username: req.session.username, email: email, uniqueUsername: validateResults});
        })
      } else {
        updateUsername(req.session.userID, newUsername, knex);
        req.session.username = newUsername;
        res.redirect('/');
      }
    });   
  });

  router.post('/account/password', (req, res) => {
    const login = validateLogin(req.session.username, knex);
    login.then(function(login){
      if (bcrypt.compareSync(req.body['oldPassword'], login)) {
        updatePassword(req.session.userID, bcrypt.hashSync(req.body['password'], 10), knex);
        res.redirect('/');  
      } else {
       res.redirect('/account');
      }
    })
  })
 return router;
}
