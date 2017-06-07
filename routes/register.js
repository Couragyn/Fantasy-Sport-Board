'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const createNewUser = require('../db/dbFunc/createNewUser');
const validateUniqueUsername = require('../db/dbFunc/validateUniqueUsername');

module.exports = (knex) => {

  router.get('/register', (req, res) => {
  
    res.render('register');
  
  });

  router.post('/register', (req, res) => {

    let username = req.body['username'];
    let email = req.body['email'];
    let password = req.body['password'];

    const validate = validateUniqueUsername(username, knex);
    validate.then(function(validate){
    
      if (!(username && email && password) || validate !== 1 || username === 'ChillDude22'){
        res.status(404);
        res.redirect('/register');
      } else {
        createNewUser(username, email, password, knex);
    
        res.redirect('/football');
      }

    });
  })
 return router;
}
