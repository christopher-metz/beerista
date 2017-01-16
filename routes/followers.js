'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const router = express.Router();
const { camelizeKeys } = require('humps');

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.claim = payload;

    next();
  });
};

router.get('/followers', authorize, (req, res, next) => {
  knex('followers')
    .innerJoin('users', 'followers.user_id_2', 'user.id')
    .where('followers.user_id_1', req.claim.userId)
    .orderBy('users.id', 'ASC')
    .then((rows) => {
      const followers = camelizeKeys(rows);

      res.send(follwers);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/followers')
