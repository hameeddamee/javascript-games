$(document).ready(function() {
	// var humanPlayer2;
	//var playerTurn2;
	var boardInput;
  
	var playerTurn;
	var compTurn;
  
	var humanPlayer;
	var compPlayer;
  
	var winCombo = [
	  [1, 2, 3],
	  [4, 5, 6],
	  [7, 8, 9],
	  [1, 4, 7],
	  [2, 5, 8],
	  [3, 6, 9],
	  [1, 5, 9],
	  [7, 5, 3]
	];
	const box = document.querySelectorAll(".game-box");
	runGame();
  
	function runGame() {
	  boardInput = Array.from(Array(10).keys());
	  for (var i = 0; i < box.length; i++) {
		box[i].innerText = "";
		box[i].style.removeProperty("background-color");
		box[i].style.removeProperty("color");
		box[i].addEventListener("click", turnClick, false);
	  }
	}
  
	function turnClick(space) {
	  if (typeof boardInput[space.target.id] == "number") {
		turn(space.target.id, playerTurn);
		if (!checkTie()) turn(checkSpot(), compTurn);
	  }
	}
  
	function turn(spaceId, player) {
	  boardInput[spaceId] = player;
	  document.getElementById(spaceId).innerText = player;
	  let gameWon = checkWin(boardInput, player);
	  if (gameWon) gameOver(gameWon);
	}
  
	function checkWin(board, player) {
	  let plays = board.reduce(
		(acc, element, i) => (element === player ? acc.concat(i) : acc),
		[]
	  );
	  let gameWon = null;
  
	  for (let [index, win] of winCombo.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
		  gameWon = { index: index, player: player };
		  break;
		}
	  }
	  return gameWon;
	}
  
	function gameOver(gameWon) {
	  for (let index of winCombo[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
		  gameWon.player === playerTurn ? "#BBD851" : "#CEA79B";
		document.getElementById(index).style.color = "Beige";
	  }
  
	  for (var i = 0; i < box.length; i++) {
		box[i].removeEventListener("click", turnClick, false);
	  }
	  /*declareWinner(gameWon.player == playerTurn ? "You Win" : "You lose");*/
	}
  
	/*function declareWinner(who) {
	  document.querySelector(".endgame").style.display = "block";
	  document.querySelector(".endgame, .text").innerText = who;
	}*/
  
	function emptySpaces() {
	  return boardInput.filter(e => typeof e == "number");
	}
  
	function checkSpot() {
	  return emptySpaces()[1];
	}
  
	function checkTie() {
	  if (emptySpaces().length === 0) {
		for (var i = 0; i < box.length; i++) {
		  //box.style.backgroundColor = "#575F4F";
		  box.removeEventListener("click", turnClick, false);
		}
		//declareWinner("Tie Game!");
		return true;
	  }
	  return false;
	}
  
	$("#chooseOne").on("click", function() {
	  compPlayer = true;
	  $("#playerMode").fadeOut("slow");
	  $("#playerChoice").fadeIn(2000);
	});
  
	$("#chooseTwo").on("click", function() {
	  compPlayer = false;
	  $("#playerMode").fadeOut("slow");
	  $("#playerChoice").fadeIn(2000);
	});
  
	$("#chooseX").on("click", function() {
	  playerTurn = "X";
	  compTurn = "0";
	  $("#playerChoice").fadeOut("slow");
	  $("#gameGrid, .score-holder").fadeIn(1000);
	});
  
	$("#chooseO").on("click", function() {
	  playerTurn = "O";
	  compTurn = "X";
	  $("#playerChoice").fadeOut("slow");
	  $("#gameGrid, .score-holder").fadeIn(1000);
	});
  
	$("#backToBasic, #reset").on("click", function() {
	  $("#playerChoice, #gameGrid, .score-holder").fadeOut();
	  $("#playerMode").fadeIn();
	});
  
	$("#reset").on("click", runGame);
});
  