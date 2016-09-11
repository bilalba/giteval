'use strict';

/**
 * @ngdoc function
 * @name gitevalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gitevalApp
 */
angular.module('gitevalApp')
  .controller('MainCtrl', function ($scope, getterService) {
  	$scope.doShit = 
  	function (t) {
      var abc = getterService.checkUser(t);
      abc.then(function(x) {
        console.log(x);
        if (x == false)
          $scope.isUserInvalid = true;
      });
  	}
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
