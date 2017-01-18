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


// Get all ratings for a user.
router.get('/ratings', authorize, (req, res, next) => {
  knex('beers')
    .select('beers.id', 'beers.name', 'beers.style', 'beers.abv', 'beers.ibu', 'beers.description', 'beers.photo_url')
    .avg('ratings.rating as rating')
    .innerJoin('ratings', 'ratings.beer_id', 'beers.id')
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

// Get all ratings for a follower.
router.get('/ratings/:id', authorize, (req, res, next) => {
  knex('beers')
    .select('beers.id', 'beers.name', 'beers.style', 'beers.abv', 'beers.ibu', 'beers.description', 'beers.photo_url')
    .avg('ratings.rating as rating')
    .innerJoin('ratings', 'ratings.beer_id', 'beers.id')
    .where('ratings.user_id', req.params.id)
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
  const { beer_id, venue_id, rating } = req.body;

  knex('ratings')
    .insert({
      beer_id: beer_id,
      user_id: req.claim.userId,
      venue_id: venue_id,
      rating: rating
    }, '*')
    .then((ratings) => {
      console.log(ratings[0]);
      res.send(camelizeKeys(ratings[0]));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
