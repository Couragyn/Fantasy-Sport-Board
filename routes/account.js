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

  router.post('/account', (req, res) => {
  
    let newUsername = req.body['username'];
    let newPassword = req.body['password'];
    let newEmail = req.body['email'];
    let userID = req.session.userID;

    console.log('newUsername:', newUsername, 'newPassword:', newPassword, 'newEmail:', newEmail);

    if (newEmail !== '') {
      updateEmail(userID, newEmail, knex);
    }

    if (newPassword !== ''){
      const login = validateLogin(req.session.username, knex);
      login.then(function(login){
        if (bcrypt.compareSync(req.body['oldPassword'], login)) {
          updatePassword(userID, bcrypt.hashSync(newPassword, 10), knex); 
        } else {
          res.redirect('/account');
        }
      })
    
    }

    if (newUsername !== ''){ 
      let email = getEmail(userID, knex);
      const validate = validateUniqueUsername(newUsername, knex);
      validate.then(function(validateResults){
        if (!validateResults){
          res.status(404);
          email.then(function(email){
            res.render('user/account', {userID: userID, username: req.session.username, email: email, uniqueUsername: validateResults});
          })
        } else {
          updateUsername(userID, newUsername, knex);
          req.session.username = newUsername;
          res.redirect('/');
        }
      });
    } else {
      res.redirect('/'); 
    }

  });
 return router;
}
