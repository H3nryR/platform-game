function Utilities() {}

Utilities.backgroundSet = function (x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis == "Y") {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h * 10, 0, 8);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  }
};
Utilities.backgroundRender = function () {
  let color1 = color(7, 11, 52); //top
  let color2 = color(133, 89, 136); //bottom
  this.backgroundSet(0, 0, settings.canvasWidth, 350, color1, color2, "Y");
};
Utilities.drawScenery = function (
  c_x = 0.001,
  c_y = 0.005,
  step = 4,
  amp = 200,
  v_f = 300,
  clr,
  w = width,
  h = height
) {
  {
    beginShape();
    fill(clr);
    noStroke();
    // Iterate through the width
    for (let i = 0; i <= w; i += step) {
      const pNoise = noise(i * c_x, c_y);
      vertex(i, v_f - pNoise * amp);
    }
    vertex(w, h);
    vertex(0, h);
    endShape(CLOSE);

    /*
      
        step = step
        c_x = coordinate x / zoom
        c_y = coordinate y
        amp = amplitude
        v_f = field of view
        clr1 = color 1 
        clr 2 = color 2
        amt = value between 0 and 1 => for blendng colors
        w = width
        h = height
      
        noise(x, [y], [z])
      
        Value will always be between 0.0 and 1.0
      
        x-coordinate in noise space
        y-coordinate in noise space
        z-coordinate in noise space
      
        smaller the difference between coordinates,
        the smoother the resulting noise sequence will be
        0.005-0.03 optimall
      
        */
  }
};
Utilities.starsArr = function (arr, starsNumber) {
  for (let i = 0; i < starsNumber; i++) {
    arr.push({
      x: random(settings.canvasWidth),
      y: random(settings.canvasHeight),
      s: random(0.8, 1.2),
    });
  }
};
Utilities.starsRender = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    const star = arr[i];
    fill(174, 197, 214);
    noStroke();
    rect(star.x, star.y, 5 * star.s, 5 * star.s);
  }
};
Utilities.snowArr = function (arr, snowNumber) {
  for (let i = 0; i < snowNumber; i++) {
    arr.push({
      x: random(settings.sceneWidth + 5000),
      y: random(settings.canvasHeight),
      s: random(0.7, 1.5),
    });
  }
  // console.log(snow.random);
};
Utilities.snowRender = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    const snow = arr[i];
    fill(174, 197, 214);
    noStroke();
    ellipse(snow.x, snow.y, 2 * snow.s, 2 * snow.s);
    if (snow.y > height + 2) {
      snow.y = -2;
    } else {
      snow.y += 1;
    }
  }
};
Utilities.poleArr = function (arr) {
  for (let i = 0; i < (settings.sceneWidth + 5000) / 1000; i++) {
    arr.push({
      x: random(settings.sceneWidth - 500),
    });
  }
};
Utilities.poleRender = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    //lines
    fill(29, 25, 67);
    rect(0, 187, settings.sceneWidth + 5000, 1);
    rect(0, 195, settings.sceneWidth + 5000, 1);
    //1
    rect(160, 200, 5, 700);
    rect(157, 195, 10, 20);
    rect(152, 185, 20, 10);
    rect(90, 180, 150, 5);
    rect(130, 170, 4, 12);
    rect(190, 170, 4, 12);
    rect(230, 185, 3, 12);
    rect(98, 185, 3, 12);
    rect(116, 165, 90, 5);
    //2
    rect(160 + 1000 * [i], 200, 5, 700);
    rect(157 + 1000 * [i], 195, 10, 20);
    rect(152 + 1000 * [i], 185, 20, 10);
    rect(90 + 1000 * [i], 180, 150, 5);
    rect(130 + 1000 * [i], 170, 4, 12);
    rect(190 + 1000 * [i], 170, 4, 12);
    rect(230 + 1000 * [i], 185, 3, 12);
    rect(98 + 1000 * [i], 185, 3, 12);
    rect(116 + 1000 * [i], 165, 90, 5);
  }
};
Utilities.cartArr = function (arr) {
  for (let i = 0; i < 10; i++) {
    arr.push({
      x: random(settings.sceneWidth),
      c: lerpColor(color(29, 25, 67), color(29, 25, 67), random(0.9, 0.9)),
    });
  }
};
Utilities.cartRender = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    const sk = arr[i];
    // Cart
    fill(29, 25, 67);
    rect(382 + sk.x, 186, 35, 4);
    ellipse(400 + sk.x, 188, 10);
    ellipse(415 + sk.x, 188, 7);
    ellipse(385 + sk.x, 188, 7);
    ellipse(400 + sk.x, 188, 5);
    ellipse(415 + sk.x, 188, 3);
    ellipse(385 + sk.x, 188, 3);
    rect(390 + sk.x, 186, 2, 45);
    rect(407 + sk.x, 186, 2, 45);
    rect(390 + sk.x, 195, 19, 2);
    rect(390 + sk.x, 205, 19, 2);
    rect(390 + sk.x, 215, 19, 2);
    rect(390 + sk.x, 225, 19, 2);
    // Cart color
    rect(382 + sk.x, 230, 35, 4);
    rect(365 + sk.x, 270, 70, 20);
    rect(365 + sk.x, 235, 2, 55);
    rect(380 + sk.x, 235, 2, 55);
    rect(417 + sk.x, 235, 2, 55);
    rect(433 + sk.x, 235, 2, 55);
    rect(365 + sk.x, 290, 70, 2);
    rect(365 + sk.x, 270, 70, 2);
    rect(362 + sk.x, 234, 76, 8);
    //
    sk.x += 0.4;
  }
};
Utilities.mountainArr = function (arr) {
  for (let i = 0; i < 10; i++) {
    arr.push({
      x: random(settings.sceneWidth - 500),
      y: 800,
      s: random(0.7, 1.5),
      cl: lerpColor(color(16, 16, 58), color(9, 12, 53), random(0, 0.5)),
      cd: lerpColor(color(41, 32, 75), color(9, 12, 53), random(0.5, 1)),
    });
  }
};
Utilities.mountainRender = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    const mountain = arr[i];

    fill(mountain.cl);
    triangle(
      mountain.x + 100 * mountain.s,
      mountain.y,
      mountain.x + 700,
      mountain.y,
      mountain.x + 550 * mountain.s,
      mountain.y - 700 * mountain.s
    );

    fill(mountain.cd);
    triangle(
      mountain.x + 50,
      mountain.y,
      mountain.x + 120 * mountain.s,
      mountain.y,
      mountain.x + 550 * mountain.s,
      mountain.y - 700 * mountain.s
    );
  }
};
Utilities.collectableRender = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].isFound) {
      const collectable = arr[i];
      fill(38, 30, 73);
      ellipse(collectable.x, collectable.y, 24 + sin(frameCount / 20) * 30);
      //
      fill(119, 130, 144);
      ellipse(collectable.x, collectable.y, 24);
      //
      fill(170, 182, 199);
      ellipse(collectable.x, collectable.y, 20);
      //
      fill(241, 239, 241);
      ellipse(collectable.x, collectable.y, 16);
      collectable.x += sin(frameCount / 25 + i) * 2;
      collectable.y -= sin(frameCount / 25 + i) * 2;

      //
    }
  }
};
Utilities.flagRender = function (logic, arr) {
  let flagPoint =
    arr.at(-1).positionX + arr.at(-1).width - arr.at(-1).width / 2 - 105;
  // let flagPoint = - 104;
  //   logic.flagReached = true;
  let flagPointY = arr.at(-1).positionY;
  //   console.log(flagPoint);
  //   let flagPointY = 500;
  if (!logic.flagReached) {
    for (let i = 0; i < 10; i++) {
      // pole
      fill(63, 63, 63);
      rect(flagPoint + 100, flagPointY - 300, 8, 300);
      fill(0, 0, 0);
      rect(flagPoint + 100, flagPointY - 300, 2, 300);
      rect(flagPoint + 106, flagPointY - 300, 2, 300);
      rect(flagPoint + 80, flagPointY - 8, 50, 10);
      ellipse(flagPoint + 104, flagPointY - 300, 15);
      fill(63, 63, 63);
      rect(flagPoint + 82, flagPointY - 6, 46, 6);
      // triangle
      fill(115, 130, 211);
      triangle(
        flagPoint + 109,
        flagPointY - 20,
        flagPoint + 189 + sin(frameCount / 30) * 10,
        flagPointY - 30 + sin(frameCount / 15) * 8,
        flagPoint + 109,
        flagPointY - 60
      );
    }
  } else {
    for (let i = 0; i < 10; i++) {
      // pole
      fill(63, 63, 63);
      rect(flagPoint + 100, flagPointY - 300, 8, 300);
      fill(0, 0, 0);
      rect(flagPoint + 100, flagPointY - 300, 2, 300);
      rect(flagPoint + 106, flagPointY - 300, 2, 300);
      rect(flagPoint + 80, flagPointY - 8, 50, 10);
      ellipse(flagPoint + 104, flagPointY - 300, 15);
      fill(63, 63, 63);
      rect(flagPoint + 82, flagPointY - 6, 46, 6);
      // triangle
      fill(115, 130, 211);
      triangle(
        flagPoint + 109,
        flagPointY - 250,
        flagPoint + 189 + sin(frameCount / 30) * 10,
        flagPointY - 260 + sin(frameCount / 15) * 8,
        flagPoint + 109,
        flagPointY - 290
      );
    }
  }
};
Utilities.cloudsArr = function (arr) {
  for (let i = 0; i < 20; i++) {
    arr.push({
      x: chance.integer({ min: 0, max: settings.canvasWidth * 3 }),
      y: random(0, 35),
      s: random(0.1, 0.8),
      c: lerpColor(color(29, 25, 67), color(29, 25, 67), random(0.2, 0.7)),
    });
  }
};
Utilities.cloudsRender = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    const cloud = arr[i];
    noStroke();
    fill(cloud.c);
    ellipse(cloud.x + 300, cloud.y + 100, 150 * cloud.s, 60 * cloud.s);
    ellipse(cloud.x + 300, cloud.y + 90, 90 * cloud.s, 60 * cloud.s);
    ellipse(cloud.x + 250, cloud.y + 90, 90 * cloud.s, 40 * cloud.s);
    ellipse(cloud.x + 350, cloud.y + 120, 90 * cloud.s, 40 * cloud.s);
    // Animate Clouds
    cloud.x -= 0.2;
  }
};
