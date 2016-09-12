'use strict';

/**
 * @ngdoc function
 * @name gitevalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gitevalApp
 */
angular.module('gitevalApp')
  .controller('MainCtrl', function ($location, getterService) {
    var scope= this;
  	this.doShit = 
  	function (t) {
      var abc = getterService.checkUser(t);
      abc.then(function(x) {
        console.log(x);
        if (x == false)
          scope.isUserInvalid = true;
        else
        $location.path('/user/'+x);
      });
  	}
  });
