'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.claim = payload;

    next();
  });
};

router.get('/stars', authorize, (req, res, next) => {
  knex('stars')
    .innerJoin('beers', 'stars.beer_id', 'beers.id')
    .where('stars.user_id', req.claim.userId)
    .orderBy('stars.beer_id', 'ASC')
    .then((rows) => {
      if (rows.length === 0) {
        throw boom.create(404, 'You havent followed any beers');
      }

      const stars = camelizeKeys(rows);

      res.send(stars);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/stars', authorize, (req, res, next) => {
  const { beerId } = req.body;

  knex('beers')
    .where('id', beerId)
    .first()
    .then((beer) => {
      if (!beer) {
        // Go grab beer info from request body and add to DB
      }

      return knex('stars')
      .insert({
        beer_id: beerId,
        user_id: req.claim.userId
      }, '*');
    })
    .then((stars) => {
      res.send(camelizeKeys(stars[0]));
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/stars', authorize, (req, res, next) => {
  const { beerId } = req.body;

  knex('stars')
    .where('beer_id', beerId)
    .where('user_id', req.claim.userId)
    .first()
    .then((star) => {
      if (!star) {
        throw boom.create(404, 'Star not found');
      }

      return knex('stars')
        .del('*')
        .where('user_id', req.claim.userId)
        .where('beer_id', beerId);
    })
    .then((stars) => {
      const star = stars[0];

      delete star.id;
      res.send(camelizeKeys(star));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
