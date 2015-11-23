// config is using environment vars so that
// sensitive info is not in the repo
var conf = {
	keys: {
	    consumer_key: 'Ivu6jajZfRxc9pbXiFgjqOh3s',
	    consumer_secret: 'k4RNCJUl106LMdCrhWbeknKakqR86Aqdmg0PtRS5WqzzEUx8i7',
	    access_token_key: '4327843872-PwIioRORNdxGGyNibZsc8pvydWqpcIA39XOwRf8',
	    access_token_secret: 'eknylcC0vdZQ41rb7RDjcSvmbzgtstTKVjGq7N82clB7q'
	},
	terms: ['ajith','thala','அஜித்','vedhalam','vedalam']
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

function onTweeted(err) {
    if(err) {
        console.error("tweeting failed :(");
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
        status: '@itisprashanth idhu attack panra panda, idhu attract panra panda'+Math.random()
    }, onTweeted);
}

// start listening to a twitter stream with the filter
// that is in the config
tu.filter({
    track: conf.terms
}, function(stream) {
    console.log("listening to stream");
    stream.on('tweet', onTweet);
});
