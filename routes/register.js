'use strict';

require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const createNewUser = require('../db/dbFunc/createNewUser');
const validateUniqueUsername = require('../db/dbFunc/validateUniqueUsername');
const registrationEmail = require('../public/scripts/mailgun/registration');

module.exports = (knex) => {

  router.use(cookieSession({
    name: 'session',
    secret: process.env.SECRET
  }))
  
  router.get('/register', (req, res) => {
    res.render('user/register', {userID: req.session.userID, username: req.session.username, uniqueUsername: true});
  });

  router.post('/register', (req, res) => {

    let username = req.body['username'];
    let email = req.body['email'];
    let password = bcrypt.hashSync(req.body['password'], 10);
    
    const validate = validateUniqueUsername(username, knex);
    validate.then(function(validateResults){
      if (!(username && email && password && req.body['confirmPassword'] === req.body['password']) || !validateResults){
        res.status(404);
        res.render('user/register', {userID: req.session.userID, username: req.session.username, uniqueUsername: validateResults});
      } else {
        createNewUser(username, email, password, knex).then(function(userID) {
          req.session.userID = userID;
          req.session.username = username;
          registrationEmail(username, email);
          res.redirect('/football');
        })
      }
    });
  })
 return router;
}
