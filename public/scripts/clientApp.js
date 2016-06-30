var myApp=angular.module( 'myApp', [] );

myApp.controller( 'superheroController', [ '$scope', '$http', function( $scope, $http ){
  //Creates options for the front end dropdown menu
  $scope.options = [{ name: "Invisibility", id: 1 }, { name: "Flight", id: 2 },
    {name: "Super Speed", id:3}, {name: "Heat Vision", id:4}, {name: "Super Strength", id:5},
    {name: "Accelerated Healing", id:6}, {name: "Power Blast", id:7},
    {name: "Animal Affinity", id:8}];
  $scope.selectedOption = $scope.options[1];
//Captures values from database input
  $scope.getHeroes= function(){
    console.log('in Get Heroes');
    $http({
      method: 'GET',
      url: '/getHeroes',
    }).then(function(response){
      $scope.heroes=response.data;
      console.log($scope.heroes);
    });

  };

//Function to handle whenever a new super hero is entered into the DB
  $scope.enterSuperhero = function(){
    console.log('in enterSuperhero');
    //Compiles object from page inputs
    var newSuperHero = {
      firstName: $scope.fName,
      lastName: $scope.lName,
      city: $scope.city,
      superPower: $scope.selectedOption.name
      // superpower: $scope.power_name
    };
    //Sends inputs to server via POST method, and then refreshes page view via getHeroes();
    $http({
      method: 'POST',
      url: '/postHero',
      data: newSuperHero
    }).then(function(){
  $scope.getHeroes();
});

  //Clears inputs

  $scope.fName='';
  $scope.lName='';
  $scope.city='';
  $scope.selectedOption.id = 1;
    console.log(newSuperHero);

  };


  //Handles when heroes are deleted.
  $scope.removeHero = function(place){
    console.log(place);
    //Captures the Mongo database _id by using the listing's index
    var deleteID = $scope.heroes[place]._id;
    var heroToDelete = {
      deleteME: deleteID
    };
    console.log($scope.heroes[place]._id);
    //Sends the _ID back to server for deletion
    //I wasn't able to figure out the app.delete method, so I
    //sent this information back via a post call.
    $http({
      method: 'POST',
      url: '/deleteHero',
      data: heroToDelete
    }).then(function(){
      $scope.getHeroes();

});

// ************   Below are some of my attempts to use delete funciton ********************
// ********************************************************************************
//
// $http({
//   method: 'DELETE',
//   url: '/deleteHero',
//   data: deleteID
// });

    // $http.delete('/deleteHero', heroToDelete[0]).then($scope.getHeroes());

// $http.delete('/deleteHero' , deleteID)
// .success(function(deleteID, status, headers){
//   $scope.ServerResponse = deleteID;
// })
// .error(function(data, status, header, config){
//     $scope.ServerResponse = htmlDecode("Data: " + data +
//                     "\n\n\n\nstatus: " + status +
//                     "\n\n\n\nheaders: " + header +
//                     "\n\n\n\nconfig: " + config);
// });

    // $http.delete('/deleteHero', "cats")
    // .then(
    //   function(response){
    //     console.log(response);
    //   },
    //   function(response){
    //     console.log(response);
    //   }
  // );

  };
// This function is called to ensure all heroes in the database are
// shown upon page load. 
$scope.getHeroes();

}]); // end mondayController
