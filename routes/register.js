"use strict";

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const createNewUser = require('../db/dbFunc/createNewUser');

module.exports = (knex) => {

router.get('/register', (req, res) => {
  
    res.render('register');
  
});

router.post('/register', (req, res) => {

  let username = req.body['username'];
  let password = req.body['password'];
  let newUserObj = {username: username, password: password};
  if (!(username && password)){
    res.status(404)
    res.redirect('/register');
  } else {
    createNewUser(username, password, knex);
    
    res.redirect('/football');
  }

});

 return router;
}
