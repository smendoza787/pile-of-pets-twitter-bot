const twit = require('twit');
const config = require('./config.js');

var Twitter = new twit(config);

var retweet = function() {
  var params = {
    q: '#happypets',
    result_type: 'recent',
    lang: 'en'
  };
}