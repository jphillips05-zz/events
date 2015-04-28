angular.module('events', [
	'ngRoute',
	'ui.bootstrap'
])

.controller('homeCtrl', ['$scope', '$http', function($scope, $http){
	$scope.states = usStates;
	
	$scope.init = function(){
		$scope.event = {
			category: '',
			city: '',
			contact: '',
			startDate: '',
			endDate: '',
			description: '',
			location: '',
			name: '',
			organizer: '',
			state: '',
			tickets: '',
			website: '',
			price: 0
		}
	};

	$scope.init();

	$scope.open = function($event, opened) {
		$event.preventDefault();
	    $event.stopPropagation();

	    $scope[opened] = true;
  	};

  	$scope.enterEvent = function() {
  		$scope.msg = '';
  		var e = $scope.event;

		$http({method: 'POST', url: 'api/event', data: e })
			.success(function(data, status){
				if(data.success) {
					window.scrollTo(0,0);
					$scope.init();
				}
			})
			.error(function(data, status){
				console.log(data);
			});
  	};

  	$scope.checkNumber = function(evt) {
  		var theEvent = evt || window.event;
		var key = theEvent.keyCode || theEvent.which;
		key = String.fromCharCode( key );
		var regex = /[0-9]|\./;
		if( !regex.test(key) ) {
		theEvent.returnValue = false;
		if(theEvent.preventDefault) theEvent.preventDefault();
		}
  	}

}]);

