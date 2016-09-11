'use strict';

/**
 * @ngdoc function
 * @name gitevalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gitevalApp
 */
angular.module('gitevalApp')
  .controller('MainCtrl', function ($scope) {
  	$scope.doShit = 
  	function (t) {
  		console.log(t)
  		console.log("LALAMA");
  	}
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
