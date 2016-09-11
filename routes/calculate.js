var GitHubApi = require('github');
config = require('./../config');

var github = new GitHubApi({
    // optional
    debug: false,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    pathPrefix: "", // for some GHEs; none for GitHub
    headers: {
        "user-agent": "GitEval" // GitHub is happy with a unique user agent
    },
    Promise: require('bluebird'),
    followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
    timeout: 10000
});


github.authenticate({
    type: "oauth",
    key: config.github.CLIENT_ID,
    secret: config.github.CLIENT_SECRET
});



exports.followers = function(req, res) {
    if (req.query.user) {
        // var user = 'zxx';
        github.users.getFollowersForUser({'user': req.query.user}).then
        (function(data) {
            console.log('sa mina mee na' + data.length);
            var score = 0;
            var count = 0;
            for (var i = 0; i < data.length; i++) {
                console.log(i);
                github.users.getForUser({'user':data[i].login})
                .then(function(user) {
                    console.log(user);
                    score += user.followers/parseFloat(user.following);
                    count++;
                    if (count == data.length){ res.send({'score': score});}
                });   
            }
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
    if (req.query.user) {
        github.users.getForUser({'user':req.query.user})
        .then(function(data){

        });
    }
};


exports.repodata = function(req, res) {
    if (req.query.user) {
        github.repos.getForUser({'user':req.query.user, 'sort':'pushed', 'per_page':100})
        .then(function(data){
            var total_repos = data.length; // going tu use this.
            var unforked = 0;
            var size = 0;
            for (var i =0; i< total_repos; i++) {
                if (!data[i].fork) unforked++;
                size += data[i].size;
            }
            var send = {
                'total_repos': total_repos,
                unforked : unforked,
                size : size
            };
            res.send(send);
            // startLanguageComputation(req.query.user, data, unforked);
            startContributionComputation(req.query.user, data, unforked);
        }).catch(function(error) {
            res.send({error:"gateway timeout"})
        });
    } else {
        res.send({error: 'no user specified bc'})
    }
};


function startContributionComputation(user, data, unforked) {
    // going to fill this out. 
    var contributions = {commits:0, by_repo:[]};
    var count = 0;
    var commit_count = 0;
    for (var i = 0; i < data.length; i++) {
        (function(i) {
            github.repos.getContributors({user:user, repo:data[i].name, per_page:100})
            .then(function(contribdata) {
                for (var j = 0; j < contribdata.length; j++) {
                        if (contribdata[j].login == user){
                            contributions.commits += contribdata[j].contributions;
                            var obj = {};
                            obj[data[i].name] = contribdata[j].contributions;
                            contributions.by_repo.push(obj);
                        }
                }

                count++;
                if (count == data.length) {
                    // all tasks done.
                    console.log(contributions); 
                }
            })
            .catch(function(err){
                console.log(err);
            })  
        })(i);
    }
}

function startLanguageComputation(user, data, unforked) {
    var languages = {};
    var count = 0;
    for (var i = 0; i < data.length; i++) {
        (function(i) {
            if (!data[i].fork){
                github.repos.getLanguages({user:user, repo:data[i].name,per_page:100})
                .then(function(langdata) {

                    console.log(data[i].name);
                    console.log(langdata);  
                    Object.keys(langdata).forEach(function(k) {
                        if (k == 'meta') return;
                        if (!languages[k]) languages[k] = {score:0, breakdown:[]};
                        languages[k].score += langdata[k];
                        var obj = {};
                        obj[data[i].name] = langdata[k];
                        languages[k].breakdown.push(obj);
                    });
                    count++;
                    if (count == unforked) storeLanguage(user, languages);
                }).catch( function(err) {
                    console.log(err);
                });
            }
        })(i);
    }
}

function storeLanguage(user, lang) { // move into a cache from here.
    console.log(JSON.stringify(lang));
}


exports.activity = function() {

};

