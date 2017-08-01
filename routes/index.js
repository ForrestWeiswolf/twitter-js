const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.use(express.static('public'))

router.get('/users/:name', function(req, res) {
  let name = req.params.name;
  let tweets = tweetBank.find( {name: name} );
  res.render( 'index', { tweets: tweets } );
});

router.get('/tweets/:id', function(req, res) {
  let tweets = tweetBank.find( {id: parseInt(req.params.id)} );
  res.render( 'index', { tweets: tweets } );
});


router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
});

module.exports = router;
