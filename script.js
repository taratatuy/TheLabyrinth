import { Player } from './classes.js';
import { CageStructure, Floor } from './grid.js';

const canvas = document.getElementById('field');
const field = canvas.getContext('2d');

field.width = canvas.width;
field.height = canvas.height;

let player;
let cageStrcture;
const drawable = [];

function init() {
  cageStrcture = new CageStructure(field);
  drawable.push(cageStrcture);

  player = new Player(field, 10, 10);
  drawable.push(player);
  cageStrcture.setLight(player.getX(), player.getY());

  draw();
}

function step(shiftX, shiftY) {
  if (
    cageStrcture.filled(
      player.getX() + shiftX,
      player.getY() + shiftY
    ) instanceof Floor
  ) {
    cageStrcture.unsetLight(player.getX(), player.getY());
    player.turn(shiftX, shiftY);
    cageStrcture.setLight(player.getX(), player.getY());
  }

  draw();
}

function draw() {
  drawable.forEach((obj) => {
    obj.draw();
  });
}

addEventListener('keydown', (e) => {
  if (e.key in stepKeys) step(stepKeys[e.key].x, stepKeys[e.key].y);
});

init();

const stepKeys = {
  1: { x: -1, y: 1 },
  b: { x: -1, y: 1 },
  2: { x: 0, y: 1 },
  j: { x: 0, y: 1 },
  3: { x: 1, y: 1 },
  n: { x: 1, y: 1 },
  4: { x: -1, y: 0 },
  h: { x: -1, y: 0 },
  6: { x: 1, y: 0 },
  l: { x: 1, y: 0 },
  7: { x: -1, y: -1 },
  y: { x: -1, y: -1 },
  8: { x: 0, y: -1 },
  k: { x: 0, y: -1 },
  9: { x: 1, y: -1 },
  u: { x: 1, y: -1 },
};
