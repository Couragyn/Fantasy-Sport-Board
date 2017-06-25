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

module.exports = (knex) => {
  
  router.use(cookieSession({
    name: 'session',
    secret: 'urlshy5hdyjtid'
  })) 

  router.get('/account', (req, res) => {
    const email = getEmail(req.session.userID, knex);
    email.then(function(email){
      res.render('user/account', {userID: req.session.userID, username: req.session.username, email: email});
    })
  });

  router.post('/account/email', (req, res) => {
    updateEmail(req.session.userID, req.body['email'], knex);
    res.redirect('/');
  });

  router.post('/account/username', (req, res) => {
    let username = req.body['username'];
    updateUsername(req.session.userID, username, knex);
    req.session.username = username;
    res.redirect('/');
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


