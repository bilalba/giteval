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
  	function () {
  		console.log("LALAMA");
  	}
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
