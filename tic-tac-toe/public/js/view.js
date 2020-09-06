export const view = {
  boxes: document.querySelectorAll(".game-box"),
  playMode: document.querySelector("#playMode"),
  symbolChoice: document.querySelector("#symbolChoice"),
  chooseOne: document.querySelector("#chooseOne"),
  chooseTwo: document.querySelector("#chooseTwo"),
  chooseX: document.querySelector("#chooseX"),
  chooseO: document.querySelector("#chooseO"),
  secondPlayer: document.querySelector("#secondPlayerName"),
  scoreHolder: document.querySelector(".score-holder"),
  gameGrid: document.querySelector("#gameGrid"),
  dialogBox: document.querySelector(".dialog-box"),
  firstScore: document.querySelector("#firstScore"),
  secondScore: document.querySelector("#secondScore"),
  playAgain: document.querySelector("#playAgain"),
  backToBasic: document.querySelector("#backToBasic"),
  reset: document.querySelector("#reset"),
  dialogText: document.querySelector(".dialog-box .text"),
  showElement(element, displayType = "block") {
    element.style.display = displayType;
  },
  hideElement(element) {
    element.style.display = "none";
  },
  render(target, content, attributes) {
    for (const key in attributes) {
      target.setAttribute(key, attributes[key]);
    }
    if (content) target.innerHTML = content;
  },
  selectBoxAndRender(boxId, content, attributes) {
    const box = document.getElementById(boxId);
    this.render(box, content, attributes);
  },
  setup(controller, secondPlayerName = "Computer:", action = "rungame") {
    this.boxes.forEach(function (box) {
      box.innerText = "";
      box.style.removeProperty("background-color");
      box.style.removeProperty("color");
      box.addEventListener("click", controller.turnClick, false);
    });
    this.render(this.dialogText, "");
    this.hideElement(this.dialogBox);
    this.render(this.secondPlayer, secondPlayerName);

    if (action === "rungame") {
      this.chooseOne.addEventListener("click", controller.chooseOne, false);
      this.chooseTwo.addEventListener("click", controller.chooseTwo, false);
      this.chooseX.addEventListener("click", controller.chooseX, false);
      this.chooseO.addEventListener("click", controller.chooseO, false);

      [this.backToBasic, this.reset].forEach((btn) => {
        btn.addEventListener("click", () => {
          this.render(this.firstScore, "0");
          this.render(this.secondScore, "0");
          this.hideElement(this.symbolChoice);
          this.hideElement(this.gameGrid);
          this.hideElement(this.scoreHolder);
          this.showElement(this.playMode);
        });
      }, false);
      this.reset.addEventListener("click", controller.runGame, false);
    }
  },
};
