"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/football", (req, res) => {
    // knex
    //   .select("*")
    //   .from("users")
    //   .then((results) => {
    //     res.json(results);
    // });
    res.render("football/index");
  });


  return router;
}
