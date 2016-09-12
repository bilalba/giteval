angular.module('gitevalApp')
  .controller('UserCtrl', function ($routeParams,getterService) {
	var id = $routeParams.id;
	this.id = id;
	var vm = this;
   this.getFollowers = function() {
   		console.log("HERE");
   		var result = getterService.getFollowers(id);
   		result.then( function(score) {
   			console.log("scoring");
   			console.log(score.score);
   			vm.score = score.score;
   		});
   }
  });
