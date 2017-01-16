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

      return knex('favorites')
      .insert({
        book_id: bookId, // eslint-disable-line camelcase
        user_id: req.claim.userId // eslint-disable-line camelcase
      }, '*');
    })
    .then((favorites) => {
      res.send(camelizeKeys(favorites[0]));
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/favorites', authorize, (req, res, next) => {
  const { bookId } = req.body;

  if (Number.isNaN(Number.parseInt(bookId))) {
    return next(boom.create(400, 'Book ID must be an integer'));
  }

  knex('favorites')
    .where('book_id', bookId)
    .first()
    .then((favorite) => {
      if (!favorite) {
        throw boom.create(404, 'Favorite not found');
      }

      return knex('favorites')
        .del('*')
        .where('user_id', req.claim.userId)
        .where('book_id', bookId);
    })
    .then((favorites) => {
      const favorite = favorites[0];

      delete favorite.id;
      res.send(camelizeKeys(favorite));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
