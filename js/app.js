angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {

  $stateProvider
    .state('eventmenu', {
      url: "/event",
      abstract: true,
      templateUrl: "templates/event-menu.html"
    })

    .state('eventmenu.checkin', {
      url: "/check-in",
      views: {
        'menuContent' :{
          templateUrl: "templates/check-in.html",
          controller: "CheckinCtrl"
        }
      }
    })
    .state('eventmenu.attendees', {
      url: "/attendees",
      views: {
        'menuContent' :{
          templateUrl: "templates/attendees.html",
          controller: "AttendeesCtrl"
        }
      }
    })
  
  $urlRouterProvider.otherwise("/event/attendees");
  $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://localhost:3000']);
})

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate, $http) {

  var api = 'http://localhost:3000/';

  $http.get(api+'users.json').success(function(data, status, headers, config){
    $scope.attendees = data;
  });
  
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

.controller('CheckinCtrl', function($scope, $http) {

  var api = 'http://localhost:3000/';
  $scope.showForm = true;
  
  $scope.shirtSizes = [
    { text: 'Large', value: 'L' },
    { text: 'Medium', value: 'M' },
    { text: 'Small', value: 'S' }
  ];
  
  $scope.attendee = {};
  $scope.submit = function() {
    if(!$scope.attendee.firstname) {
      alert('Info required');
      return;
    }
    $scope.showForm = false;
    $scope.attendees.push($scope.attendee);
    
    var req = {
      method: 'POST',
      data: angular.toJson($scope.attendee),
      url: api+'users.json',
    };
    $http(req).success(function(data, status, headers, config) {
      console.log(data);
    })
;  };

  
})

.controller('AttendeesCtrl', function($scope) {
  
  $scope.activity = [];
  $scope.arrivedChange = function(attendee) {
    var msg = attendee.firstname + ' ' + attendee.lastname;
    msg += (!attendee.arrived ? ' just left': ' has arrived');
    $scope.activity.push(msg);
    if($scope.activity.length > 3) {
      $scope.activity.splice(0, 1);
    }
  };
  
});