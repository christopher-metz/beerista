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
  knex.select('beer.id', 'beers.name', 'beers.style', 'beers.abv', 'beers.ibu', 'beers.description', 'beers.photo_url').from('beers')
    .innerJoin('ratings', 'ratings.beer_id', 'beers.id')
    .avg('ratings.rating as rating')
    .where('ratings.user_id', req.claim.userId)
    .groupBy('beers.id')
    .then((ratings) => {
      if (ratings.length === 0) {
        res.send('You have not rated any beers!');
      }

      res.send(ratings);
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
