app.service('getterService', function($http) {
	this.checkUser = function(user)
    {

        return $http.get('https://api.github.com/users/'+user, {timeout: 10000})
        .then(function(result)
            {
                
                if (result.data.login)
                    return result.data.login; 
                return false;
            },
            function(err)
            {
                // console.log(" errrr         rrrrrrrrrrr : ", err);
                return false;

            });
    }
});