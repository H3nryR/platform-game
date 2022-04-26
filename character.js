function Character() {
  this.floor = 500;
  this.position = createVector(300, this.floor);
  this.scrollPos = 0;
  this.scrollPosY = 0;
  this.worldX = 0;
  this.isRight = false;
  this.isLeft = false;
  this.isJumping = false;
  this.jumpCounter = 0;
  this.isFalling = false;
  this.isTrapped = false;
  this.isDamaged = false;
  this.isShooting = false;
  this.mass = 1;
  // this.onPlatform = false;
}
Character.prototype.info = function () {
  console.log(`Character X:` + this.position.x);
  console.log(`Character Y:` + this.position.y);
  console.log(`Character isRight:` + this.isRight);
  console.log(`Character isLeft:` + this.isLeft);
  console.log(`Character isJumping:` + this.isJumping);
  console.log(`Character isFalling:` + this.isFalling);
};
Character.prototype.drawController = function () {
  if (this.isRight && (this.isJumping || this.isFalling)) {
    this.drawCharRightJumpingFalling();
  } else if (this.isRight) {
    this.drawCharRight();
  } else if (this.isLeft && (this.isJumping || this.isFalling)) {
    this.drawCharLeftJumpingFalling();
  } else if (this.isLeft) {
    this.drawCharLeft();
  } else if (this.isJumping || this.isFalling) {
    this.drawCharJumpingFalling();
  } else {
    this.drawChar();
  }
};
Character.prototype.drawChar = function () {
    // Head
  stroke(0);
  strokeWeight(1);
  fill(189, 139, 114);
  rect(this.position.x - 13, this.position.y - 76 - 3, 26, 26);
  // Hair
  noStroke();
  fill(43, 30, 13);
  rect(this.position.x - 13, this.position.y - 76 - 3, 26, 5);
  rect(this.position.x - 13, this.position.y - 76 - 3, 5, 7);
  rect(this.position.x + 8, this.position.y - 76 - 3, 5, 7);
  //Beard
  fill(144, 94, 67);
  rect(this.position.x - 12, this.position.y - 55 - 3, 25, 5);
  //Eyes
  fill(243, 243, 243);
  rect(this.position.x - 9, this.position.y - 67 - 3, 6, 4);
  rect(this.position.x + 4, this.position.y - 67 - 3, 6, 4);
  fill(77, 58, 129);
  rect(this.position.x - 7, this.position.y - 67 - 3, 3, 4);
  rect(this.position.x + 5, this.position.y - 67 - 3, 3, 4);
  //Mouth
  stroke(0);
  strokeWeight(1);
  noFill();
  beginShape();
  vertex(this.position.x - 6, this.position.y - 58 - 3);
  vertex(this.position.x - 5, this.position.y - 56 - 3);
  vertex(this.position.x + 4, this.position.y - 56 - 3);
  endShape();
  // Tshirt
  fill(196, 184, 167);
  rect(this.position.x - 10, this.position.y - 50 - 3, 20, 25);
  rect(this.position.x - 20, this.position.y - 50 - 3, 10, 10);
  // Arms
  rect(this.position.x + 10, this.position.y - 50 - 3, 10, 10);
  fill(189, 139, 114);
  rect(this.position.x - 20, this.position.y - 45 - 3, 10, 23);
  rect(this.position.x + 10, this.position.y - 45 - 3, 10, 23);
  // Legs
  fill(64, 65, 68);
  rect(this.position.x - 10, this.position.y - 24 - 3, 10, 23);
  rect(this.position.x, this.position.y - 24 - 3, 10, 23);
  // Shoes
  fill(128, 128, 128);
  rect(this.position.x, this.position.y - 3, 10, 3);
  rect(this.position.x - 10, this.position.y - 3, 10, 3);
  //
};
Character.prototype.drawCharRight = function () {
  // Head
  stroke(0);
  strokeWeight(1);
  fill(189, 139, 114);
  rect(this.position.x - 13, this.position.y - 76 - 3, 26, 26);
  // Hair
  noStroke();
  fill(43, 30, 13);
  rect(this.position.x - 13, this.position.y - 76 - 3, 26, 5);
  rect(this.position.x - 13, this.position.y - 76 - 3, 15, 8);
  rect(this.position.x - 13, this.position.y - 76 - 3, 10, 17);
  //Beard
  fill(144, 94, 67);
  rect(this.position.x - 12, this.position.y - 55 - 3, 25, 5);
  //Eyes
  fill(243, 243, 243);
  rect(this.position.x + 7, this.position.y - 67 - 3, 6, 4);
  fill(77, 58, 129);
  rect(this.position.x + 10, this.position.y - 67 - 3, 3, 4);
  //Mouth
  stroke(0);
  strokeWeight(1);
  noFill();
  beginShape();
  vertex(this.position.x + 7, this.position.y - 58 - 3);
  vertex(this.position.x + 8, this.position.y - 56 - 3);
  vertex(this.position.x + 13, this.position.y - 56 - 3);
  endShape();
  // Tshirt
  fill(196, 184, 167);
  rect(this.position.x - 10, this.position.y - 3 - 50, 14, 25);
  rect(this.position.x - 13, this.position.y - 3 - 50, 10, 10);
  // Legs
  fill(64, 65, 68);
  rect(this.position.x - 10, this.position.y - 3 - 24, 14, 23);
  // Arms
  fill(189, 139, 114);
  rect(this.position.x - 13, this.position.y - 3 - 45, 10, 23);
  // Shoes
  fill(128, 128, 128);
  rect(this.position.x - 10, this.position.y - 3, 14, 3);
};
Character.prototype.drawCharRightJumpingFalling = function () {
  // Head
  stroke(0);
  strokeWeight(1);
  fill(189, 139, 114);
  rect(this.position.x - 13, this.position.y - 76 - 3, 26, 26);
  // Hair
  noStroke();
  fill(43, 30, 13);
  rect(this.position.x - 13, this.position.y - 76 - 3, 26, 5);
  rect(this.position.x - 13, this.position.y - 76 - 3, 15, 8);
  rect(this.position.x - 13, this.position.y - 76 - 3, 10, 17);
  //Beard
  fill(144, 94, 67);
  rect(this.position.x - 12, this.position.y - 55 - 3, 25, 5);
  //Eyes
  fill(243, 243, 243);
  rect(this.position.x + 7, this.position.y - 67 - 3, 6, 4);
  fill(77, 58, 129);
  rect(this.position.x + 10, this.position.y - 67 - 3, 3, 4);
  //Mouth
  stroke(0);
  strokeWeight(1);
  noFill();
  beginShape();
  vertex(this.position.x + 7, this.position.y - 3 - 58);
  vertex(this.position.x + 8, this.position.y - 3 - 56);
  vertex(this.position.x + 13, this.position.y - 3 - 56);
  endShape();
  // Tshirt
  fill(196, 184, 167);
  rect(this.position.x - 10, this.position.y - 3 - 50, 14, 25);
  rect(this.position.x - 13, this.position.y - 3 - 50, 10, 10);
  // Leg1
  fill(64, 65, 68);
  rect(this.position.x - 10, this.position.y - 3 - 24, 14, 15);
  // Arms
  fill(189, 139, 114);
  rect(this.position.x - 13, this.position.y - 3 - 45, 10, 23);
  // Shoes
  fill(128, 128, 128);
  rect(this.position.x - 10, this.position.y - 3 - 10, 14, 3);
};
Character.prototype.drawCharLeft = function () {
  // Head
  stroke(0);
  strokeWeight(1);
  fill(189, 139, 114);
  rect(this.position.x - 13, this.position.y - 3 - 76, 26, 26);
  // Hair
  noStroke();
  fill(43, 30, 13);
  rect(this.position.x - 13, this.position.y - 3 - 76, 26, 5);
  rect(this.position.x - 2, this.position.y - 3 - 76, 15, 8);
  rect(this.position.x + 3, this.position.y - 3 - 76, 10, 17);
  //Beard
  fill(144, 94, 67);
  rect(this.position.x - 12, this.position.y - 3 - 55, 25, 5);
  //Eyes
  fill(243, 243, 243);
  rect(this.position.x - 12, this.position.y - 3 - 67, 6, 4);
  fill(77, 58, 129);
  rect(this.position.x - 12, this.position.y - 3 - 67, 3, 4);
  //Mouth
  stroke(0);
  strokeWeight(1);
  noFill();
  beginShape();
  vertex(this.position.x - 12, this.position.y - 3 - 56);
  vertex(this.position.x - 7, this.position.y - 3 - 56);
  vertex(this.position.x - 6, this.position.y - 3 - 58);
  endShape();
  // Tshirt
  fill(196, 184, 167);
  rect(this.position.x - 5, this.position.y - 3 - 50, 14, 25);
  rect(this.position.x + 3, this.position.y - 3 - 50, 10, 10);
  // Legs
  fill(64, 65, 68);
  rect(this.position.x - 5, this.position.y - 3 - 24, 14, 23);
  // Arms
  fill(189, 139, 114);
  rect(this.position.x + 3, this.position.y - 3 - 45, 10, 23);
  // Shoes
  fill(128, 128, 128);
  rect(this.position.x - 5, this.position.y - 3, 14, 3);
};
Character.prototype.drawCharLeftJumpingFalling = function () {
  // Head
  stroke(0);
  strokeWeight(1);
  fill(189, 139, 114);
  rect(this.position.x - 13, this.position.y - 3 - 76, 26, 26);
  // Hair
  noStroke();
  fill(43, 30, 13);
  rect(this.position.x - 13, this.position.y - 3 - 76, 26, 5);
  rect(this.position.x - 2, this.position.y - 3 - 76, 15, 8);
  rect(this.position.x + 3, this.position.y - 3 - 76, 10, 17);
  //Beard
  fill(144, 94, 67);
  rect(this.position.x - 12, this.position.y - 3 - 55, 25, 5);
  //Eyes
  fill(243, 243, 243);
  rect(this.position.x - 12, this.position.y - 3 - 67, 6, 4);
  fill(77, 58, 129);
  rect(this.position.x - 12, this.position.y - 3 - 67, 3, 4);
  //Mouth
  stroke(0);
  strokeWeight(1);
  noFill();
  beginShape();
  vertex(this.position.x - 12, this.position.y - 3 - 56);
  vertex(this.position.x - 7, this.position.y - 3 - 56);
  vertex(this.position.x - 6, this.position.y - 3 - 58);
  endShape();
  // Tshirt
  fill(196, 184, 167);
  rect(this.position.x - 5, this.position.y - 3 - 50, 14, 25);
  rect(this.position.x + 3, this.position.y - 3 - 50, 10, 10);
  // Legs
  fill(64, 65, 68);
  rect(this.position.x - 5, this.position.y - 3 - 24, 14, 15);
  // Arms
  fill(189, 139, 114);
  rect(this.position.x + 3, this.position.y - 3 - 45, 10, 23);
  // Shoes
  fill(128, 128, 128);
  rect(this.position.x - 5, this.position.y - 3 - 10, 14, 3);
};
Character.prototype.drawCharJumpingFalling = function () {
  // Head
  stroke(0);
  strokeWeight(1);
  fill(189, 139, 114);
  rect(this.position.x - 13, this.position.y - 3 - 76, 26, 26);
  // Hair
  noStroke();
  fill(43, 30, 13);
  rect(this.position.x - 13, this.position.y - 3 - 76, 26, 5);
  rect(this.position.x - 13, this.position.y - 3 - 76, 5, 7);
  rect(this.position.x + 8, this.position.y - 3 - 76, 5, 7);
  //Beard
  fill(144, 94, 67);
  rect(this.position.x - 12, this.position.y - 3 - 55, 25, 5);
  //Eyes
  fill(243, 243, 243);
  rect(this.position.x - 9, this.position.y - 3 - 67, 6, 4);
  rect(this.position.x + 4, this.position.y - 3 - 67, 6, 4);
  fill(77, 58, 129);
  rect(this.position.x - 7, this.position.y - 3 - 67, 3, 4);
  rect(this.position.x + 5, this.position.y - 3 - 67, 3, 4);
  //Mouth
  stroke(0);
  strokeWeight(1);
  fill(0);
  beginShape(TRIANGLES);
  vertex(this.position.x - 6, this.position.y - 3 - 57);
  vertex(this.position.x - 5, this.position.y - 3 - 56);
  vertex(this.position.x + 4, this.position.y - 3 - 56);
  endShape();
  // Tshirt
  fill(196, 184, 167);
  rect(this.position.x - 10, this.position.y - 3 - 50, 20, 25);
  rect(this.position.x - 20, this.position.y - 3 - 50, 10, 10);
  // Arms
  rect(this.position.x + 10, this.position.y - 3 - 50, 10, 10);
  fill(189, 139, 114);
  rect(this.position.x - 20, this.position.y - 3 - 45, 10, 23);
  rect(this.position.x + 10, this.position.y - 3 - 45, 10, 23);
  // Legs
  fill(64, 65, 68);
  rect(this.position.x - 10, this.position.y - 3 - 35, 10, 23);
  rect(this.position.x, this.position.y - 3 - 32, 10, 23);
  // Shoes
  fill(128, 128, 128);
  rect(this.position.x, this.position.y - 3 - 8, 10, 3);
  rect(this.position.x - 10, this.position.y - 3 - 11, 10, 3);
};
Character.prototype.updatePosX = function () {
  this.worldX = this.position.x - this.scrollPos;
};
