import { view } from "./view.js";
import { model } from "./model.js";
export const controller = {
  runGame() {
    model.boardSpaces = Array.from(Array(10).keys());
    model.playerOne.score = 0;
    model.playerTwo.score = 0;
    view.setup(controller);
  },
  turnClick(event) {
    let { boardSpaces, playMode, nextPlayer, playerOne, playerTwo } = model;

    if (typeof boardSpaces[event.target.id] == "number") {
      if (playMode === 2) {
        let playerSym =
          nextPlayer === playerOne.symbol ? playerOne.symbol : playerTwo.symbol;
        controller.turn(event.target.id, playerSym);
        if (
          !controller.checkWin(boardSpaces, playerSym) &&
          !controller.checkTie()
        )
          model.nextPlayer =
            playerSym === playerOne.symbol
              ? playerTwo.symbol
              : playerOne.symbol;
      } else {
        controller.turn(event.target.id, playerOne.symbol);
        if (
          !controller.checkWin(boardSpaces, playerOne.symbol) &&
          !controller.checkTie()
        )
          controller.turn(controller.checkSpot(), playerTwo.symbol);
      }
    }
  },
  turn(boxId, playerSymbol) {
    model.boardSpaces[boxId] = playerSymbol;
    view.selectBoxAndRender(boxId, playerSymbol);
    let gameWon = this.checkWin(model.boardSpaces, playerSymbol);
    if (gameWon) this.gameOver(gameWon);
  },
  checkWin(board, playerSymbol) {
    let plays = board.reduce((acc, element, i) => {
      return element === playerSymbol ? acc.concat(i) : acc;
    }, []);
    let gameWon = null;

    for (let [index, win] of model.winCombos.entries()) {
      if (win.every((elem) => plays.indexOf(elem) > -1)) {
        gameWon = { index: index, playerSymbol: playerSymbol };
        break;
      }
    }
    return gameWon;
  },
  gameOver(gameWon) {
    for (let index of model.winCombos[gameWon.index]) {
      const colour =
        gameWon.playerSymbol === model.playerOne.symbol ? "#BBD851" : "#CEA79B";

      const attributes = {
        style: `background-color: ${colour}; color: Beige;`,
      };

      view.selectBoxAndRender(index, null, attributes);
    }

    view.boxes.forEach((box) => {
      box.removeEventListener("click", this.turnClick, false);
    });

    gameWon.playerSymbol === model.playerOne.symbol
      ? (model.playerOne.score += 1)
      : (model.playerTwo.score += 1);

    if (model.playMode === 2) {
      this.declareWinner(
        gameWon.playerSymbol == model.playerOne.symbol
          ? `${model.playerOne.symbol}  won`
          : `${secondPlayer} won`
      );
    } else {
      this.declareWinner(
        gameWon.playerSymbol == model.playerOne.symbol
          ? `${model.playerOne.symbol} Win`
          : `${model.playerOne.symbol} lose`
      );
    }
  },
  declareWinner(msg) {
    view.render(view.firstScore, model.playerOne.score);
    view.render(view.secondScore, model.playerTwo.score);
    view.showElement(view.dialogBox);
    view.render(view.dialogText, msg);
    view.playAgain.addEventListener("click", this.continueGame, false);
  },
  emptySpaces() {
    return model.boardSpaces.filter(
      (space) => typeof space == "number" && space !== 0
    );
  },
  checkSpot() {
    return this.minimax(model.boardSpaces, model.playerTwo.symbol).index;
  },
  checkTie() {
    if (this.emptySpaces().length === 0) {
      const attributes = {
        style: `background-color: #BBD851; color: Beige;`,
      };
      view.boxes.forEach((box) => {
        view.render(box, null, attributes);
        box.removeEventListener("click", this.turnClick, false);
      });
      this.declareWinner("Cats game!");
      return true;
    }
    return false;
  },
  minimax(newBoard, player) {
    let availSpots = this.emptySpaces(newBoard);

    if (this.checkWin(newBoard, model.playerOne.symbol)) {
      return { score: -10 };
    } else if (this.checkWin(newBoard, model.playerTwo.symbol)) {
      return { score: 10 };
    } else if (availSpots.length === 0) {
      return { score: 0 };
    }

    let moves = [];
    for (let i = 0; i < availSpots.length; i++) {
      let move = {};
      move.index = newBoard[availSpots[i]];
      newBoard[availSpots[i]] = player;

      if (player === model.playerTwo.symbol)
        move.score = this.minimax(newBoard, model.playerOne.symbol).score;
      else move.score = this.minimax(newBoard, model.playerTwo.symbol).score;
      newBoard[availSpots[i]] = move.index;
      if (
        (player === model.playerTwo.symbol && move.score === 10) ||
        (player === model.playerOne.symbol && move.score === -10)
      )
        return move;
      else moves.push(move);
    }

    let bestMove, bestScore;
    if (player === model.playerTwo.symbol) {
      bestScore = -1000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      bestScore = 1000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  },
  continueGame() {
    model.boardSpaces = Array.from(Array(10).keys());
    view.setup(controller, model.playerTwo.name, "continue");
  },

  chooseOne() {
    model.setPlayMode(1);
    model.playerTwo.name = "Computer:";
    view.hideElement(view.playMode);
    view.showElement(view.symbolChoice);
  },

  chooseTwo() {
    model.setPlayMode(2);
    model.playerTwo.name = "Player 2:";
    view.hideElement(view.playMode);
    view.showElement(view.symbolChoice);
    view.render(view.secondPlayer, "Player 2:");
  },
  chooseX() {
    model.setPlayerSymbol("X");
    view.hideElement(view.symbolChoice);
    view.showElement(view.scoreHolder, "flex");
    view.showElement(view.gameGrid, "grid");
  },
  chooseO() {
    model.setPlayerSymbol("O");
    view.hideElement(view.symbolChoice);
    view.showElement(view.scoreHolder, "flex");
    view.showElement(view.gameGrid, "grid");
  },
};
