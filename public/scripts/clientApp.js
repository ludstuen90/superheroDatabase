var myApp=angular.module( 'myApp', [] );

myApp.controller( 'superheroController', [ '$scope', '$http', function( $scope, $http ){

  $scope.options = [{ name: "Invisibility", id: 1 }, { name: "Flight", id: 2 }, {name: "Super Speed", id:3}, {name: "Heat Vision", id:4}, {name: "Super Strength", id:5}, {name: "Accelerated Healing", id:6}, {name: "Power Blast", id:7}, {name: "Animal Affinity", id:8}];
  $scope.selectedOption = $scope.options[1];



  $scope.enterSuperhero = function(){
    console.log('in enterSuperhero');
    var newSuperHero = {
      firstName: $scope.fName,
      lastName: $scope.lName,
      city: $scope.city,
      superPower: $scope.selectedOption.name
      // superpower: $scope.power_name
    };

    console.log(newSuperHero);
  };







}]); // end mondayController
