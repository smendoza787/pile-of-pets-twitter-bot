const twit = require('twit');
const config = require('./config.js');

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
// grab & retweet as soon as program is running...
retweet();
// retweet every 50 minutes
setInterval(retweet, 3000000);