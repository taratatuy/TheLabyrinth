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
  cageStrcture.setLight(player.getX(), player.getY());
  drawable.push(player);

  draw();
}

function step(key) {
  if (
    cageStrcture.filled(
      player.getX() + stepKeys[key].x,
      player.getY() + stepKeys[key].y
    ) instanceof Floor
  ) {
    cageStrcture.unsetLight(player.getX(), player.getY());
    player.turn(stepKeys[key].x, stepKeys[key].y);
    cageStrcture.setLight(player.getX(), player.getY());
  }

  draw();
}

function draw() {
  field.fillStyle = 'black';
  field.fillRect(0, 0, field.width, field.height);

  drawable.forEach((obj) => {
    obj.draw();
  });
}

addEventListener('keydown', (e) => {
  if (e.key in stepKeys) step(e.key);
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
