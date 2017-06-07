'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const validateLogin= require('../db/dbFunc/validateLogin');
const validateUniqueUsername = require('../db/dbFunc/validateUniqueUsername');

module.exports = (knex) => {

    router.use(cookieSession({
        name: 'session',
        secret: 'urlshy5hdyjtid'
    }))

    router.get('/login', (req, res) => {

        res.render('login', {user: req.session.user_id});
  
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
                    if (bcrypt.compareSync(password, login)) {
                        req.session.user_id = username;
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