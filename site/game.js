
var app = angular.module("MatchGame", []);

app.controller("SelectorCtrl", function($scope, $interval) {

  $scope.timerTime = 0;
  $scope.currentSelectionId = "unpicked";
  $scope.gameStarted = false;
  $scope.gameFinished = false;
  $scope.pairsMade = 0;

  function timerfunc() {
    if(!$scope.gameStarted)
      return;
    if($scope.gameFinished)
      return;
    $scope.timerTime += 25/1000;
  }

  $interval(timerfunc, 25);

  function getButton(x,y) {
    var str = "btn"+x+"x"+y;

    console.log("\'" + str + "\'");
    return document.getElementById(str);
  }

  function generateBoard() {
    var nums = [];
    var uniquenums = [];

    // 8x8 board- needs 8 number pairs
    for(i = 0; i < 10; i++) {
      var number = ~~(Math.random()*25);
      while(_.contains(uniquenums, number)) {
        number = ~~(Math.random()*25);
      }
      uniquenums.push(number);
      nums.push(number);
      nums.push(number);
    }

    nums = _.shuffle(nums);

    for(i = 1; i < 6; i++){
      for(o = 1; o < 5; o++){
        // console.log( getButton(i,o) );
        getButton(i,o).innerHTML = nums.pop();
        // console.log("! " + i + ", " + o);
      }
    }
  }

  function checkMatch(id1, id2) {
    if(id1 == id2)
      return false;

    if(document.getElementById(id1).innerHTML == document.getElementById(id2).innerHTML)
      return true;

    return false;
  }

  function scoreTiles(id1, id2) {

    document.getElementById(id1).innerHTML = "X";
    document.getElementById(id2).innerHTML = "X";
    document.getElementById(id1).setAttribute("class", "btn btn-warning btn-block gameCell");
    document.getElementById(id2).setAttribute("class", "btn btn-warning btn-block gameCell");


    $scope.pairsMade++;

    if($scope.pairsMade == 10){
      $scope.gameFinished = true;
    }
  }


  $scope.select = function(event) {
    if(!$scope.gameStarted)
      $scope.gameStarted = true;

    if($scope.gameFinished)
      return;

    if(document.getElementById(event.target.id).innerHTML == "X")
      return;

    if($scope.currentSelectionId != "unpicked") {
      // 2nd selection
      if(checkMatch($scope.currentSelectionId, event.target.id))
        scoreTiles($scope.currentSelectionId, event.target.id);
      else{
        $(event.target.id).removeClass("animated jello");
        $(event.target.id).addClass("animated jello");
        $($scope.currentSelectionId).removeClass("animated jello");
        $($scope.currentSelectionId).addClass("animated jello");

        document.getElementById($scope.currentSelectionId).setAttribute("class", "btn btn-default btn-block gameCell");
      }

      $scope.currentSelectionId = "unpicked";

    } else {
      // 1st selection
      $scope.currentSelectionId = event.target.id;
      document.getElementById($scope.currentSelectionId).setAttribute("class", "btn btn-success btn-block gameCell");

    }
  }

  $('#resetButton').click( function() {
    location.reload();
  })
  generateBoard();
});
