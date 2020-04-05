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

  // mb some building function later (cageStrcture.build() ?):
  // ----------
  cageStrcture.addMatrix([
    [11, 10],
    [9, 10],
    [10, 9],
    [10, 11],
    [14, 13],
    [14, 12],
    [14, 11],
    [12, 13],
    [12, 12],
    [12, 11],
  ]);
  // ----------

  drawable.push(cageStrcture);

  player = new Player(field, 10, 10);
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
    player.turn(stepKeys[key].x, stepKeys[key].y);
    // wallStrcture.changeLight(player.getX(), player.getY());
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
  2: { x: 0, y: 1 },
  3: { x: 1, y: 1 },
  4: { x: -1, y: 0 },
  6: { x: 1, y: 0 },
  7: { x: -1, y: -1 },
  8: { x: 0, y: -1 },
  9: { x: 1, y: -1 },
};
