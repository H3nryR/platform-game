function Tiles(x, y, w) {
  this.positionX = x;
  this.positionY = y;
  this.width = w;
}
Tiles.tilesArr = function (container, sceneWidth) {
  for (let i = 0; i < sceneWidth / sceneWidth; i++) {
    let x = 0;
    let y = 500;
    let w = 700;
    container[i] = new Tiles(x, y, w);
  }
};
Tiles.tilesRender = function (variable) {
  for (let i = 0; i < variable.length; i++) {
    push();
    noStroke();
    fill(174, 197, 214);
    rect(variable[i].positionX, variable[i].positionY, variable[i].width, 16);
    fill(174, 197, 214);
    rect(
      variable[i].positionX,
      variable[i].positionY + 15,
      variable[i].width,
      15
    );
    fill(18, 18, 59);
    rect(
      variable[i].positionX,
      variable[i].positionY + 30,
      variable[i].width,
      400
    );
    pop();
    if (i % 2) {
      variable[i].positionY -= sin(frameCount / 25 + i) * 2;
    }
  }
};
Tiles.platformSkyArr = function (container, sceneWidth) {
  let offsetw = 0;
  // let offsetx = 0;
  for (let i = 0; i < 4; i++) {
    let x = random(750, sceneWidth - 1500);
    let y = chance.integer({ min: 200, max: 250 });
    let w = random(50, 50);
    let n = noise(offsetw) * 800;
    // let m = noise(offsetx) * sceneWidth;
    container[i] = new Tiles(x, y, w);
    offsetw += 0.9;
  }
};
Tiles.platformArr = function (container, sceneWidth) {
  let offsetw = 0;
  // let offsetx = 0;
  for (let i = 0; i < sceneWidth / 600; i++) {
    let x = 750 + (500 * i + chance.integer({ min: -0.5, max: 0.1 }));
    let y = chance.integer({ min: 400, max: 450 });
    let w = random(100, 1000);
    let n = noise(offsetw) * 800;
    // let m = noise(offsetx) * sceneWidth;
    container[i] = new Tiles(x, y, n);
    offsetw += 0.9;
    // offsetx += 0.9;
    settings.collectables.push({
      x: x + n / 4,
      y: y - 150,
      isFound: false,
    });
  }
};
Tiles.prototype.info = function () {
  console.log(this.positionX, this.positionY);
};
