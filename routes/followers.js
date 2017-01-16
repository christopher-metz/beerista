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

router.get('/followers', authorize, (req, res, next) => {
  knex('followers')
    .innerJoin('users', 'followers.user_id_2', 'user.id')
    .where('followers.user_id_1', req.claim.userId)
    .where('users.first_name', 'LIKE', `%${req.body.name}%`)
    .orWhere('users.last_name', 'LIKE', `%${req.body.name}%`)
    .orderBy('users.first_name', 'ASC')
    .then((users) => {
      if (!users) {
        throw boom.create(404, 'No Matches');
      }

      delete user.hashedPassword;

      res.send(camelizeKeys(users));
    })
    .catch((err) => {
      next(err);
    });
})

router.post('/followers', authorize, (req, res, next) => {
  knex('followers')
    .insert({
      user_id_1: req.claim.userId,
      user_id_2: req.body.userId
    }, '*')
    .then((followers) => {
      res.send(camelizeKeys(followers[0]));
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/followers', authorize, (req, res, next) => {
  knex('followers')
    .where('followers.user_id_1', req.claim.userId)
    .where('followers.user_id_2', req.body.userId)
    .first()
    .then((follower) => {
      if (!follower) {
        throw boom.create(404, 'Follower not found');
      }

      return knex('followers')
        .del('*')
        .where('followers.user_id_1', req.claim.userId)
        .where('followers.user_id_2', req.body.userId)
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
