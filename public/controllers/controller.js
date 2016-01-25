function AppCtrl($scope, $http){
	console.log("hello world from controller");

	var refresh = function(){
	$http.get('/polls').success(function(response){
	console.log("i got the data i requested");
	$scope.polls=response;
	$scope.polls="";
	$scope.data=response;
	});
};

refresh();


};
 