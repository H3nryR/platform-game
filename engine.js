function Engine(body) {
  this.body = body;
  this.g = createVector(0, 0.75);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
}
Engine.prototype.applyForce = function (vector) {
  let force = p5.Vector.div(vector, this.body.mass);
  this.acceleration.add(force);
};
Engine.prototype.update = function () {
  /*
    new velocity = velocity + acceleration
    new position = old position + new velocity
 */
  this.velocity.add(this.acceleration);
  this.body.position.add(this.velocity);
  this.acceleration.set(0, 0);
};
Engine.prototype.gravity = function () {
  this.applyForce(this.g);
};
Engine.prototype.friction = function () {
  if (this.body.floor - this.body.position.y <= 0.1) {
    // console.log(`friction detected`);
    //Direction of friction
    let friction = this.velocity.copy();
    friction.normalize();
    friction.mult(-1);
    //Magnitude of friction
    let magnitude = 0.05;
    let normal = this.body.mass;
    friction.setMag(magnitude * normal);
    this.applyForce(friction);
  }
};
Engine.prototype.floor = function () {
  if (this.body.floor - this.body.position.y <= 0.1 && !this.body.isTrapped) {
    this.body.position.y = this.body.floor;
    this.body.isFalling = false;
    this.velocity.y *= -0.2;
    this.body.jumpCounter = 0;
  }
  if (
    (this.body.worldX <= 0 && this.body.position.y >= 500) ||
    (this.body.worldX >= settings.sceneWidth && this.body.position.y >= 500) ||
    (this.body.worldX >= 720 && this.body.position.y >= 500)
  ) {
    console.log("Out of the map");
    this.body.isTrapped = true;
  }
};
Engine.prototype.changeFloorLevel = function (array) {
  for (let i = 0; i < array.length; i++) {
    if (
      array[i].positionX <= this.body.worldX + 10 &&
      array[i].positionX + array[i].width >= this.body.worldX - 10 &&
      array[i].positionY <= this.body.position.y + 20 &&
      array[i].positionY >= this.body.position.y - 5
    ) {
      this.body.floor = array[i].positionY;
      this.body.onPlatform = true;
      this.body.isTrapped = false;
      // console.log(`on the platform`);
      break;
    } else {
      this.body.floor = 500;
      this.body.onPlatform = false;
      // console.log(`off the platform`);
    }
  }

  // for (let i = 0; i < array.length; i++) {
  //   if (
  //     array[i].positionX <= this.body.position.x + 10 &&
  //     array[i].positionX + 100 >= this.body.position.x - 10 &&
  //     array[i].positionY <= this.body.position.y + 5 &&
  //     array[i].positionY >= this.body.position.y - 20
  //   ) {
  //     this.body.floor = array[i].positionY;
  //     this.body.onPlatform = true;
  //     console.log(`on the platform`);
  //   } else {
  //     this.body.floor = 500;
  //     this.body.onPlatform = false;
  //     // console.log(`off the platform`);
  //   }
  // }
};
Engine.prototype.characterScrollingX = function () {
  if (this.body.isRight) {
    if (this.body.position.x <= settings.canvasWidth * 0.7) {
      this.body.position.x += 9;
    } else {
      this.body.scrollPos -= 9;
    }
  }
  if (this.body.isLeft) {
    if (this.body.position.x > settings.canvasWidth * 0.3) {
      this.body.position.x -= 9;
    } else {
      this.body.scrollPos += 9;
    }
  }
};
Engine.prototype.characterScrollingY = function () {
  if (this.body.isJumping && this.body.jumpCounter == 0) {
    this.body.jumpCounter = 1;
    this.applyForce(createVector(0, -18));
    this.update();
  }
  if (this.body.isFalling) {
    this.body.jumpCounter = 1;
  }
  if (this.body.isTrapped) {
    this.applyForce(createVector(0, 8));
    this.update();
    if (this.body.isTrapped && this.body.position.y >= 1000) {
      this.body.scrollPos = 0;
      this.body.position.x = 200;
      this.body.isTrapped = false;
      this.body.jumpCounter = 1;
      logic.lives -= 1;
    }
  }
};
