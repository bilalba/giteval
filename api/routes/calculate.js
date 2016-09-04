var GitHubApi = require('github');

var github = new GitHubApi({
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    pathPrefix: "", // for some GHEs; none for GitHub
    headers: {
        "user-agent": "GitEval" // GitHub is happy with a unique user agent
    },
    Promise: require('bluebird'),
    followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
    timeout: 5000
});

exports.followers = function(req, res) {
	if (req.query.user) {
		// var user = 'zxx';
		github.users.getFollowersForUser({'user': req.query.user}).then
        (function(data) {
            console.log('sa mina mee na');
            res.send(data);
        })
        .catch(function(err) {
            res.send(err);
        });
        console.log('ae ae');
	} else {
		res.send({error : 'no user.'});
	}
};

exports.getUser = function() {

};


exports.activity = function() {

};

