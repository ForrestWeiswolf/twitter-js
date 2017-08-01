const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.use(express.static('public'))

router.get('/users/:name', function(req, res) {
  const decodedName = decodeURI(req.params.name)
  console.log("Decoded:", decodedName)
  let tweets = tweetBank.find( {name: req.params.name} );
  res.render( 'index', { tweets: tweets, showForm : true, name: decodedName});
});

router.get('/tweets/:id', function(req, res) {
  let tweets = tweetBank.find( {id: parseInt(req.params.id)} );
  res.render( 'index', { tweets: tweets } );
});

router.post('/tweets', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

router.get('/', function (req, res) {
  let tweets = tweetBank.list();

  tweets.forEach(function(tweet){
    tweet.encodedName = encodeURI(tweet.name)
  });

  res.render( 'index', { tweets: tweets, showForm : true, name: ''} );
});

module.exports = router;
