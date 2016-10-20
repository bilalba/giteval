'use strict';
app.service('getterService', function($http) {

    var api = 'localhost:9910';
	this.checkUser = function(user) {
        return $http.get('https://api.github.com/users/'+user, {timeout: 10000})
        .then(function(result) {
                if (result.data.login)
                    return result.data.login; 
                return false;
            },
            function(err)
            {
                // console.log(" errrr         rrrrrrrrrrr : ", err);
                return false;

            });
    };


    this.getFollowers = function(user) {
        console.log("HERE");
         return $http.get('/getfollowerscore?user='+user, {timeout: 10000})
         .then(function(result) { 
                return result.data;
            },
            function(err)
            {
                // console.log(" errrr         rrrrrrrrrrr : ", err);
                return false;

            });

    };
});