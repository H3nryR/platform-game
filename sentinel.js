function Sentinel(posX, posY) {
  this.position = createVector(posX, posY);
  this.target;
}
Sentinel.prototype.setTarget = function (targetX, targetY, sentinel) {
  this.target = createVector(targetX, targetY).sub(sentinel.position);
};
Sentinel.prototype.render = function () {
  noStroke();
  fill(155, 154, 171);
  ellipse(this.position.x, this.position.y, 40, 70);

  fill(213, 212, 214);
  ellipse(this.position.x, this.position.y, 35, 65);

  fill(72, 51, 95);
  ellipse(this.position.x, this.position.y, 15, 20);

  fill(155, 154, 171);
  ellipse(this.position.x, this.position.y, 10, 20);

  fill(99, 12, 31);
  ellipse(this.position.x, this.position.y, 7, 5);
  //
  this.position.x += sin(frameCount / 200) * 2;
  this.position.y -= sin(frameCount / 20) * 2;
};
Sentinel.prototype.showAim = function () {
  let dirRelative = p5.Vector.add(this.position, this.target);
  strokeWeight(5);
  stroke("rgba(115,130,211,0.3)");
  line(this.position.x, this.position.y, dirRelative.x, dirRelative.y);
};
Sentinel.prototype.chase = function (character) {
  if (
    this.position.x < character.worldX &&
    Math.abs(this.position.x - character.worldX) <= 600
  ) {
    // console.log(`Found you on the right`);
    this.position.x += 5;
  } else if (
    this.position.x > character.worldX &&
    Math.abs(this.position.x - character.worldX) <= 600
  ) {
    // console.log(`Found you on the left`);
    this.position.x -= 5;
  }
};
Sentinel.prototype.rayLogic = function (character, missile, cannon) {
  if (
    dist(
      character.worldX,
      character.position.y,
      this.position.x,
      this.position.y
    ) <= 600
  ) {
    this.showAim();
    missile.setInitial(cannon, settings.missiles);
  }
};
