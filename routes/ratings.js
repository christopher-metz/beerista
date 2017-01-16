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

router.get('/ratings', authorize, (req, res, next) => {
  knex('ratings')
    .innerJoin('beers', 'ratings.beer_id', 'beers.id')
    .innerJoin('venues', 'ratings.venue_id', 'venues.id')
    .where('ratings.user_id', req.claim.userId)
    .then((ratings) => {
      if (!ratings) {
        throw boom.create(404, 'Ratings not found');
      }

      res.send(camelizeKeys(ratings));
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/ratings', authorize, (req, res, next) => {
  knex('ratings')
    .insert({
      beer_id: req.body.beerId,
      user_id: req.claim.userId,
      venue_id: req.body.venueId,
      rating: req.body.rating
    }, '*')
    .then((ratings) => {
      res.send(camelizeKeys(ratings[0]));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
