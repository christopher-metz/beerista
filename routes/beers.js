'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../knex');
const router = express.Router();
const { camelizeKeys } = require('humps');

router.get('/beers', (req, res, next) => {
  // Pull fresh data from API req.body.q
});

router.get('/beers/:id', (req, res, next) => {
  // Pull specific beer page data
});

module.exports = router;
