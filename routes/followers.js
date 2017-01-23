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
    .innerJoin('users', 'followers.user_id_2', 'users.id')
    .where('followers.user_id_1', req.claim.userId)
    .orderBy('users.id', 'ASC')
    .then((rows) => {
      if (rows.length === 0) {
        throw boom.create(404, 'You havent followed anyone');
      }

      for (const user of rows) {
        delete user.hashedPassword;
      }
      const followers = camelizeKeys(rows);

      res.send(followers);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/followers/:id', authorize, (req, res, next) => {
  knex('followers')
    .innerJoin('users', 'followers.user_id_2', 'users.id')
    .where('followers.user_id_1', req.params.id)
    .orderBy('users.first_name', 'ASC')
    .then((users) => {
      if (!users) {
        throw boom.create(404, 'No Matches');
      }

      for (const user of users) {
        delete user.hashedPassword;
      }

      res.send(camelizeKeys(users));
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/follows/?', authorize, (req, res, next) => {
  const userId2 = req.query.userId2;

  knex('followers')
    .where('followers.user_id_1', req.claim.userId)
    .where('followers.user_id_2', userId2)
    .then((follow) => {
      if (!follow.length) {
        res.send(false);
      }

      res.send(true);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/followers/:id', authorize, (req, res, next) => {
  knex('followers')
    .insert({
      user_id_1: req.claim.userId,
      user_id_2: req.params.id
    }, '*')
    .then((followers) => {
      res.send(camelizeKeys(followers[0]));
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/followers/:id', authorize, (req, res, next) => {
  knex('followers')
    .where('followers.user_id_1', req.claim.userId)
    .where('followers.user_id_2', req.params.id)
    .first()
    .then((follower) => {
      if (!follower) {
        throw boom.create(404, 'Follower not found');
      }

      return knex('followers')
        .del('*')
        .where('followers.user_id_1', req.claim.userId)
        .where('followers.user_id_2', req.params.id);
    })
    .then((followers) => {
      const follower = followers[0];

      delete follower.id;
      res.send(camelizeKeys(follower));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
