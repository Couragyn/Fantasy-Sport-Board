'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const updateEmail = require('../db/dbFunc/updateEmail');
const updatePassword = require('../db/dbFunc/updatePassword');
const validateLogin = require('../db/dbFunc/validateLogin');

module.exports = (knex) => {
  
  router.use(cookieSession({
    name: 'session',
    secret: 'urlshy5hdyjtid'
  })) 

  router.get('/account', (req, res) => {
    res.render('user/account', {userID: req.session.userID, username: req.session.username});
  });

  router.post('/account/email', (req, res) => {
    let email = req.body['email'];
    let username = req.session.username;
    updateEmail(username, email, knex);
    res.redirect('/');
  });

  router.post('/account/password', (req, res) => {
    let oldPassword = req.body['oldPassword'];
    let newPassword = bcrypt.hashSync(req.body['password'], 10);
    let username = req.session.username;
    const login = validateLogin(username, knex);
    login.then(function(login){
      if (bcrypt.compareSync(oldPassword, login)) {
        updatePassword(username, newPassword, knex);
        res.redirect('/');  
      } else {
       res.redirect('/account');
      }
    })
  })
 return router;
}