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
        beer_id: beerId, // eslint-disable-line camelcase
        user_id: req.claim.userId, // eslint-disable-line camelcase
        active_flag: 1
      }, '*');
    })
    .then((stars) => {
      res.send(camelizeKeys(stars[0]));
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/stars', authorize, (req, res, next) => {
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
        .update({
          active_flag: 0,
          updated_at: Date.now()
        })
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
