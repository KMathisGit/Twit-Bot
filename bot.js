console.log("The bot is starting...");

var Twit = require('twit');
var config = require('./config')
var prompt = require('prompt');
prompt.start()

var T = new Twit(config);

console.log("Bot is ready to roll!");
var tweet_terms = "";
var tweet_count = 0;
var tweet_command = 0;
var tweet_msg = "";

console.log("Choose a command...\n1. Get tweets \n2. Post tweet");
prompt.get(['command'], function(err, result) {
    tweet_command = result.command
    if (tweet_command == 1) {
        console.log("You've chosen to get tweets.");
        console.log("Enter terms you want to search for seperated with spaces, \
        \nand also enter in the amount of tweets you want to receive back.");
        prompt.get(['terms', 'count'], function(err, result) {
            tweet_terms = result.terms;
            tweet_count = result.count;

            var params = {
                q: tweet_terms,
                count: tweet_count
            }

            T.get('search/tweets', params, gotData);
        });
    }
    if (tweet_command == 2) {
        console.log("You've chosen to post a tweet.");
        console.log("Enter the message you would like to tweet.");
        prompt.get(['message'], function(err, result) {
            tweet_msg = result.message;

            T.post('statuses/update', { status: tweet_msg }, function(err, data, response) {
                console.log(data);
                console.log("Your message was successfully posted.");
            });
        });
    }
});


function gotData(err, data, response) {
    var tweets = data.statuses;
    for (var i = 0; i < tweets.length; i++) {
        console.log(i + 1 + ". " + tweets[i].text + "\n");
    }
}