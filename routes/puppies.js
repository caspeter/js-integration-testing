'use strict';

const express = require('express');
const knex = require('../knex');

const router = express.Router();

const {camelizeKeys, decamelizeKeys} = require('humps');

router.get('/puppies', (req, res, next) =>{
  knex('puppies')
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    return err;
  });
});

router.get('/puppies/:id', (req,res,next) => {
  knex('puppies')
  .where('id', req.params.id)
  .first()
  .then((result) => {
    res.send(camelizeKeys(result))
  })
  .catch((err) => {
    return err
  });
});

router.post('/puppies', (req,res,next) => {
  const {id, name, age_in_months, breed, image_url} = req.body;

  //TODO: error checking

const newPup = {
  id,
  name,
  age_in_months,
  breed,
  image_url
};

  knex('puppies')
  .insert(newPup, '*')
  .then((insertedPuppy) => {
    const camelInsertedPuppy = camelizeKeys(insertedPuppy);
    res.send(insertedPuppy);
  })
  .catch((err) => {
    return err;
  })
})

module.exports = router;
