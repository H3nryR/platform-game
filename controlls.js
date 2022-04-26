function Controlls() {}

Controlls.keyPressed = function (body) {
  if (keyCode == 39 || keyCode == 68) {
    // console.log("right arrow");
    body.isRight = true;
  } else if (keyCode == 37 || keyCode == 65) {
    // console.log("left arrow");
    body.isLeft = true;
  } else if (keyCode == 32) {
    // console.log("space");
    body.isJumping = true;
    logic.gameStart = true;
  }
  // console.log("keyPressed: " + key);
};
Controlls.keyReleased = function (body) {
  if (keyCode == 39 || keyCode == 68) {
    // console.log("right arrow released");
    body.isRight = false;
  } else if (keyCode == 37 || keyCode == 65) {
    // console.log("left arrow released");
    body.isLeft = false;
  } else if (keyCode == 32) {
    // console.log("space released");
    body.isJumping = false;
    body.isFalling = true;
  }
  // console.log("keyReleased: " + key);
};
