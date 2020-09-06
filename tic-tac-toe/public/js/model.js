export const model = {
  boardSpaces: Array.from(Array(10).keys()),
  playerOne: {
    name: "Player 1:",
    score: 0,
    symbol: "",
  },
  playerTwo: {
    name: "Computer:",
    score: 0,
    symbol: "",
  },
  playMode: 1,
  nextPlayer: "",
  winCombos: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ],
  setPlayMode(value) {
    if (Number.isInteger(value)) {
      this.playMode = value;
    } else {
      throw new TypeError(
        `"${value}" is not a number. Play mode requires a number`
      );
    }
  },

  setPlayerSymbol(sym) {
    if (this.playMode === 1) {
      this.playerOne.symbol = sym;
      this.playerTwo.symbol = sym === "X" ? "0" : "X";
    } else {
      this.playerOne.symbol = sym;
      this.playerTwo.symbol = sym === "X" ? "0" : "X";
      this.nextPlayer = this.playerOne.symbol;
    }
  },
};
