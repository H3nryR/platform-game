"use strict";

/*===========================================
  VARIABLES
============================================*/
let settings;
let character;
let engine;
let logic;
let sentinelOne;
let sentinelTwo;
let missile;
let missile2;
/*===========================================
  PRELOAD
============================================*/
function preload() {}
/*===========================================
INITIAL SETUP
============================================*/
function setup() {
  settings = {
    canvasWidth: windowWidth,
    canvasHeight: 576,
    sceneWidth: 12000,
    sceneHeight: 1000,
    groundLevel: 500,
    tiles_ground: [],
    tiles_platforms: [],
    mountain: [],
    stars: [],
    clouds: [],
    snow: [],
    pole: [],
    cart: [],
    collectables: [],
    missiles: [],
    missiles2: [],
  };
  createCanvas(settings.canvasWidth, settings.canvasHeight);
  /*===========================================
    ARRAYS INIT
  ============================================*/
  Tiles.tilesArr(settings.tiles_ground, settings.sceneWidth);
  Tiles.platformArr(settings.tiles_platforms, settings.sceneWidth);
  Utilities.starsArr(settings.stars, 20);
  Utilities.snowArr(settings.snow, 150);
  Utilities.poleArr(settings.pole);
  Utilities.cartArr(settings.cart);
  Utilities.mountainArr(settings.mountain);
  Utilities.cloudsArr(settings.clouds);
  /*===========================================
    INSTANCES
  ============================================*/
  character = new Character();
  engine = new Engine(character);
  logic = new gameLogic();
  sentinelOne = new Sentinel(
    random(800, settings.sceneWidth / 2),
    random(100, 200)
  );
  sentinelTwo = new Sentinel(
    random(settings.sceneWidth / 2, settings.sceneWidth - 1000),
    random(100, 200)
  );
  missile = new Missile();
  missile2 = new Missile();
}
/*===========================================
    CANVAS
============================================*/
function draw() {
  /*===========================================
  BACKGROUND / SKY / CLOUDS
  ============================================*/
  background(54, 88, 114);
  Utilities.backgroundRender();
  /*===========================================
  RENDER GAME ASSETS...
  ============================================*/
  Utilities.starsRender(settings.stars);
  Utilities.drawScenery(
    0.012,
    0.005,
    4,
    150,
    330,
    [29, 25, 67],
    settings.canvasWidth
  );
  Utilities.drawScenery(
    0.01,
    0.005,
    1,
    100,
    300,
    [7, 11, 52],
    settings.canvasWidth
  );
  scale(0.9);
  Utilities.cloudsRender(settings.clouds);
  /*===========================================
  TRANSLATE START
  ============================================*/
  push();
  translate(character.scrollPos, character.scrollPosY);
  /*===========================================
  ...RENDER GAME ASSETS
  ============================================*/
  Utilities.poleRender(settings.pole);
  Utilities.cartRender(settings.cart);
  Utilities.mountainRender(settings.mountain);
  Utilities.snowRender(settings.snow);
  Tiles.tilesRender(settings.tiles_ground);
  Tiles.tilesRender(settings.tiles_platforms);
  Utilities.collectableRender(settings.collectables);
  Utilities.flagRender(logic, settings.tiles_platforms);
  /*===========================================
  TRANSLATE STOP
  ============================================*/
  pop();
  /*===========================================
    GAME CHARACTER
  ============================================*/
  character.updatePosX();
  character.drawController();
  /*===========================================
    PHYSICS ENGINE
  ============================================*/
  engine.floor();
  engine.changeFloorLevel(settings.tiles_platforms);
  engine.characterScrollingX();
  engine.characterScrollingY();
  engine.gravity();
  engine.friction();
  engine.update();
  /*===========================================
    SENTINELS
  ============================================*/
  push();
  translate(character.scrollPos, character.scrollPosY);
  sentinelOne.render();
  sentinelOne.setTarget(
    character.worldX,
    character.position.y - 40,
    sentinelOne
  );
  sentinelOne.chase(character);
  sentinelOne.rayLogic(character, missile, sentinelOne);
  Missile.render(settings.missiles);
  Missile.cleanArr(settings.missiles);
  //
  sentinelTwo.render();
  sentinelTwo.setTarget(
    character.worldX,
    character.position.y - 40,
    sentinelTwo
  );
  sentinelTwo.chase(character);
  sentinelTwo.rayLogic(character, missile2, sentinelTwo);
  Missile.render(settings.missiles2);
  Missile.cleanArr(settings.missiles2);
  pop();
  /*===========================================
    GAME LOGIC
  ============================================*/
  logic.update(character);
  logic.heartsRender();
  logic.detectCollectable(character, settings.collectables);
  logic.checkFlag(character, settings.tiles_platforms);
  logic.end();
  Missile.hit(settings.missiles, character, logic);
  /*===========================================
  START/STOP
  ============================================*/
  gameLogic.startGame(logic);
  gameLogic.gameOver(logic);
  gameLogic.gameEnd(logic, settings.collectables);
}
/*===========================================
    CHARACTER KEYS CONTROLLERS
============================================*/
function keyPressed() {
  Controlls.keyPressed(character);
}
function keyReleased() {
  Controlls.keyReleased(character);
}
