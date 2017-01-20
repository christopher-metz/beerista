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

// Get all ratings for a user.
router.get('/stars', authorize, (req, res, next) => {
  knex('beers')
    .select('stars.id as starId', 'beers.id', 'beers.name', 'beers.style', 'beers.abv', 'beers.ibu', 'beers.description', 'beers.photo_url', 'beers.source_id')
    .innerJoin('stars', 'stars.beer_id', 'beers.id')
    .where('stars.user_id', req.claim.userId)
    .orderBy('beers.name')
    .then((ratings) => {
      if (ratings.length === 0) {
        res.send('You have not rated any beers!');
      }
      // Was causing an error in search.js by failing the ajax request which negated the call to popualteResults;

      res.send(ratings);
    })
    .catch((err) => {
      next(err);
    });
});

// Get all ratings for a follower.
router.get('/stars/:id', authorize, (req, res, next) => {
  knex('beers')
    .select('beers.id', 'beers.name', 'beers.style', 'beers.abv', 'beers.ibu', 'beers.description', 'beers.photo_url')
    .innerJoin('stars', 'stars.beer_id', 'beers.id')
    .where('stars.user_id', req.params.id)
    .orderBy('beers.name')
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

router.post('/stars', authorize, (req, res, next) => {
  const { beerId } = req.body;

  knex('beers')
    .where('id', beerId)
    .first()
    .then((beer) => {
      if (!beer) {
        throw boom.create(404, 'Beer not found');
      }

      return knex('stars')
        .where('beer_id', beerId)
        .where('user_id', req.claim.userId)
    })
    .then((star) => {
      if (star.length) {
        console.log(star);
        console.log('star already exists');
        throw boom.create(400, 'Star already exists');
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
    .then((star) => {
      if (!star) {
        throw boom.create(404, 'Star not found');
      }

      return knex('stars')
        .del('*')
        .where('user_id', req.claim.userId)
        .where('beer_id', beerId)
    })
    .then((stars) => {
      console.log(stars);
      const star = stars[0];

      delete star.id;
      res.send(camelizeKeys(star));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
