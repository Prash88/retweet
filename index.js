// config is using environment vars so that
// sensitive info is not in the repo
var conf = {
	keys: {
	    consumer_key: 'YITzvtItTz0fPN8eFsAjZnMuX',
	    consumer_secret: 'zir7pYhRV86hqdu4SHvC3HRw8QqJA6fAZ5Zb2Cs27PNNYy1qmv',
	    access_token_key: '4368073355-Vc6FiURUPh3nXFo2Xj0cVgdmV9SAyABXh8XiTAp',
	    access_token_secret: 'OTFNiOUu2nvjiu68IrN0mxwRsfHqfv4KIASp7Qi0MEtgq'
	},
	terms: ['dmkfails','sagayam','sagayam2016','சகாயம்']
};

// going to use the tuiter node module to get access to twitter
var tu = require('tuiter')(conf.keys);
// what to do after we retweet something.
// if it fails i really don't care unless
// i'm debugging
function onReTweet(err) {
    if(err) {
        console.error("retweeting failed :(");
        console.error(err);
    }
}

// what to do when we get a tweet
function onTweet(tweet) {
    // if it's flagged as a retweet or has RT
    // in there then we probably don't want
    // to retweet it again.
    if (tweet.retweeted) {
        return;
    }
    if (tweet.text.indexOf("RT") !== -1) {
        return;
    }
    console.log("Retweeting: " + tweet.text);
    // note we're using the id_str property since
    // javascript is not accurate for 64bit ints
    tu.retweet({
        id: tweet.id_str
    }, onReTweet);

    tu.update({
        status: 'Please support sagayam sir #sagayam2016 #WeNeedChange #திராவிடம்ஒழிக‌'
    }, onReTweet);

    tu.update({
        status: 'மக்களே தயவு செய்து சகாயம் அய்யாவுக்கு ஆதரவு தாருங்கள்  #sagayam2016 #WeNeedChange #திராவிடம்ஒழிக‌'
    }, onReTweet);

}

// start listening to a twitter stream with the filter
// that is in the config
tu.filter({
    track: conf.terms
}, function(stream) {
    console.log("listening to stream");
    stream.on('tweet', onTweet);
});
