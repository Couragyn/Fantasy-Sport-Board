'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const validateLogin= require('../db/dbFunc/validateLogin');
const validateUniqueUsername = require('../db/dbFunc/validateUniqueUsername');

module.exports = (knex) => {

    router.get('/login', (req, res) => {
  
        res.render('login');
  
    });

    router.post('/login', (req, res) => {

        let username = req.body['username'];
        let password = req.body['password'];

        const validate = validateUniqueUsername(username, knex);
        validate.then(function(validate){
         
            if (validate === 1){ 
                res.redirect('/login');
            } else {
                const login = validateLogin(username, knex);
                login.then(function(login){
                    console.log('password:', login);
                    if (password === login) {
                        res.redirect('/football');
                    } else {
                        res.redirect('/login');
                    }
                });        
            }
        });
    })

 return router;
}