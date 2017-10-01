const twit = require('twit'),
      config = require('./config.js');

var Twitter = new twit(config);

// RETWEET BOT ===================================================

// find latest tweet according to the 'q' in params
var retweet = function() {
  var params = {
    q: '#happypets',
    result_type: 'recent',
    lang: 'en'
  };

  Twitter.get('search/tweets', params, (err, data) => {
    if (!err) {
      // grab ID of tweet to retweet
      var retweetId = data.statuses[0].id_str;
      // tell twitter to retweet
      Twitter.post('statuses/retweet/:id', {
        id: retweetId
      }, (err, response) => {
        if (response) {
          console.log('Retweeted!');
        }
        // if there was an error while tweeting
        if (err) {
          console.log('Something went wrong while retweeting...');
        }
      });
    } else {
      // if unable to search a tweet
      console.log('Something went wrong while searching...');
    }
  });
}
retweet();
setInterval(retweet, 3000000);

// FAVORITE BOT ====================================================

// find a random tweet and favorite it
var favoriteTweet = () => {
  var params = {
    q: '#happypets',
    result_type: 'recent',
    lang: 'en'
  };

  // find the tweet
  Twitter.get('search/tweets', params, (err, data) => {
    // find tweets
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);

    // if random tweet exists
    if (typeof randomTweet != 'undefined') {
      // tell twitter to favorite
      Twitter.post('favorites/create', {
        id: randomTweet.id_str
      }, (err, response) => {
        if (err) {
          console.log('Cannot be favorited...Error');
        } else {
          console.log('Favorited...success!');
        }
      });
    }
  });
};
favoriteTweet();
setInterval(favoriteTweet, 3600000);

function ranDom(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}