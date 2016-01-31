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

var arry = [1,2,3];

$scope.options = arry;

  $scope.removeOption = function() {
    arry.pop();
  };

  $scope.addOption = function() {
    var num=arry.length+1;
    arry.push(num);
  };
	

	$scope.addPoll = function(){
		console.log($scope.polls);
		$http.post('/polls', $scope.polls).success(function (response){
			console.log(response);
			refresh();
		});
	};
	
	$scope.removePoll=function(id){
		console.log(id);
	  $http.delete('/polls/' + id).success(function(response){
		 refresh(); 
	  });
	};
	
	$scope.votePoll=function(id){
			$http.get('/vote/'+id).success(function(response){
     	    $scope.votedata=response[0];
            $scope.items=response[0].data;
		});
	};
	
	$scope.votefor=function(chosen){
 	  	var id=document.getElementById('idNum').value;
        $http.put('/vote/'+ id, {opt:chosen}).success(function(){
          console.log('updated');
        });
	};
	
};
 