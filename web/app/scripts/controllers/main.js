'use strict';

/**
 * @ngdoc function
 * @name gitevalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gitevalApp
 */
angular.module('gitevalApp')
  .controller('MainCtrl', function ($scope,$location, getterService) {
    var hey = this;
  	this.doShit = 
  	function (t) {
      var abc = getterService.checkUser(t);
      abc.then(function(x) {
        console.log(x);
        if (x == false)
          hey.isUserInvalid = true;
        else
        $location.path('/user/'+x);
      });
  	}
  });
