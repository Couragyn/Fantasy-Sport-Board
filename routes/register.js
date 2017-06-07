'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const createNewUser = require('../db/dbFunc/createNewUser');
const validateUniqueUsername = require('../db/dbFunc/validateUniqueUsername');

module.exports = (knex) => {

  router.use(cookieSession({
    name: 'session',
    secret: 'urlshy5hdyjtid'
  }))

  router.get('/register', (req, res) => {
      
      res.render('register', {user: req.session.user_id});
   
  });

  router.post('/register', (req, res) => {

    let username = req.body['username'];
    let email = req.body['email'];
    let password = bcrypt.hashSync(req.body['password'], 10);

    const validate = validateUniqueUsername(username, knex);
    validate.then(function(validate){
    
      if (!(username && email && password) || validate !== 1 || username === 'username'){
        res.status(404);
        res.redirect('/register');
      } else {
        createNewUser(username, email, password, knex);
        req.session.user_id = username;
        res.redirect('/football');
      }

    });
  })
 return router;
}
