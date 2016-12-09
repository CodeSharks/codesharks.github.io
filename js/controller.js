var app = angular.module('CodeShark', ['firebase']);

app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://codesharks.firebaseio.com/");
    return $firebaseAuth(ref);
  }
]);

app.controller("AuthCtrl", ["$scope", "Auth", "$window",

  function($scope, Auth, $window) {
    $scope.signup = function () {
       $window.location.href = "https://www.facebook.com/codesharksja/";
    }
    
    $scope.login = function() {
      $scope.message = null;
      $scope.error = null;

    Auth.$authWithPassword({
      email: $scope.email,
      password: $scope.password
    }).then(function(authData) {
      //$scope.message= "Logged in as:" + authData.uid;
      $window.location.href = 'dashboard.html';
    }).catch(function(error) {
      $scope.error = "FAILURE! TRY AGAIN SCRUB!"
      //"Authentication failed: " +error;
    });
  }}
]);

app.controller('Dash', function($scope, $rootScope, $window, Auth, $firebaseObject){
  var ref = new Firebase("https://codesharks.firebaseio.com/");
  var nug = "gpj.";
  var user = ref.getAuth();
  if (!user || user == null) {
    $window.location.href = 'index.html';
  };

  var rekt = new Firebase("https://codesharks.firebaseio.com/");
  $scope.rekt = $firebaseObject(rekt);


  $scope.idNum = "img/none.jpg";

  $scope.find = function (n) {
    try {
      $scope.idNum = $scope.rekt.rekt + n + nug.split('').reverse().join('');
    } catch(e) {
      $scope.idNum = "img/nowhere.jpg"
    }
     
  }
});