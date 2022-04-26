function gameLogic() {
  this.collectables = 0;
  this.lives = 4;
  this.score = 0;
  this.flagReached = false;
  this.gameStart = false;
  this.gameEnd = false;
  this.gameOver = false;
}

gameLogic.prototype.heartsRender = function () {
  for (let i = 0; i < this.lives; i++) {
    let x = 30 + 35 * [i];
    let y = 35;
    let size = 23;
    fill(115, 130, 211);
    beginShape();
    vertex(x, y);
    bezierVertex(
      x - size / 2,
      y - size / 2,
      x - size,
      y + size / 3,
      x,
      y + size
    );
    bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    endShape(CLOSE);
  }
};
gameLogic.prototype.update = function (character) {
  fill(255);
  noStroke();
  textSize(15);
  text("Fireflies: " + this.collectables, 20, 80);
};
gameLogic.prototype.end = function () {
  if (this.lives <= 0) {
    this.gameOver = true;
  }
  if (this.lives >= 1 && this.flagReached) {
    this.gameEnd = true;
  }
};
gameLogic.prototype.checkFlag = function (character, arr) {
  let flagPosition =
    arr.at(-1).positionX + arr.at(-1).width - arr.at(-1).width / 2 - 105;
  for (let i = 0; i < 10; i++) {
    if (!this.flagReached) {
      if (character.worldX >= flagPosition + 105) {
        this.flagReached = true;
      }
    }
    // console.log(this.flagReached);
  }
};
gameLogic.prototype.detectCollectable = function (character, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].isFound) {
      if (
        dist(
          character.worldX + 5,
          character.position.y - 20,
          arr[i].x,
          arr[i].y
        ) <= 50
      ) {
        arr[i].isFound = true;
        this.collectables += 1;
      }
    }
  }
};
gameLogic.startGame = function (logic) {
  if (!logic.gameStart) {
    fill(7, 11, 52, 200);
    rect(0, 0, settings.canvasWidth + 300, settings.canvasHeight + 300);
    fill(255);
    noStroke();
    textSize(25);

    text(
      "A to move left \nD to move right \nSPACE to jump",
      settings.canvasWidth / 2,
      settings.canvasHeight / 2
    );

    text(
      "To start a game press SPACE",
      settings.canvasWidth / 2.3,
      settings.canvasHeight / 4
    );
    frameRate(1);
  } else {
    frameRate(60);
  }
};
gameLogic.gameOver = function (logic) {
  if (logic.gameOver) {
    fill(7, 11, 52, 255);
    rect(0, 0, settings.canvasWidth + 300, settings.canvasHeight + 300);
    fill(255);
    noStroke();
    textSize(25);
    text("You lost...", settings.canvasWidth / 2, settings.canvasHeight / 2);
    text(
      "Refresh the page to play again",
      settings.canvasWidth / 2.5,
      settings.canvasHeight / 2 + 50
    );

    frameRate(0);
  }
};
gameLogic.gameEnd = function (logic, collectables) {
  if (logic.flagReached && !logic.gameOver) {
    fill(7, 11, 52, 200);
    rect(0, 0, settings.canvasWidth + 300, settings.canvasHeight + 300);
    fill(255);
    noStroke();
    textSize(25);
    text(
      "Level Completed",
      settings.canvasWidth / 2,
      settings.canvasHeight / 4
    );
    fill(255);
    noStroke();
    textSize(25);
    text(
      "Collected: " + logic.collectables + " out of " + collectables.length,
      settings.canvasWidth / 2,
      settings.canvasHeight / 3
    );
    fill(255);
    noStroke();
    textSize(25);
    text(
      "Refresh the page to start again",
      settings.canvasWidth / 2.2,
      settings.canvasHeight / 2
    );
    // frameRate(0);
  }
};
