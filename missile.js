function Missile(d, i, p) {
  this.speed = 15;
  this.fire = true;
  this.direction = d;
  this.initialPos = i;
  this.position = p;
}

Missile.prototype.setInitial = function (cannon, arr) {
  if (frameCount % 30 == 0) {
    let direction = cannon.target.setMag(this.speed);
    let initialPos = cannon.position;
    let position = initialPos.copy();

    arr.push(new Missile(direction, initialPos, position));
  }
};
Missile.render = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].fire) {
      noStroke();
      fill(196, 81, 74);
      ellipse(arr[i].position.x, arr[i].position.y, 10, 10);

      arr[i].position.add(arr[i].direction);
    }
  }
};
Missile.cleanArr = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (
      dist(
        arr[i].position.x,
        arr[i].position.y,
        arr[i].initialPos.x,
        arr[i].initialPos.y
      ) >= 1100
    ) {
      arr.splice(i, 1); // from index i remove 1 element
    }
  }
};
Missile.hit = function (arr, character, logic) {
  for (let i = 0; i < arr.length; i++) {
    if (
      dist(
        arr[i].position.x,
        arr[i].position.y,
        character.worldX,
        character.position.y - 40
      ) <= 10
    ) {
      arr.splice(i, 1);
      logic.lives -= 1;

      console.log("Hit!");
      break;
    }
  }
};
