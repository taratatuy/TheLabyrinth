import { Player, WallStructure, Wall } from './classes.js';

const canvas = document.getElementById('field');
const field = canvas.getContext('2d');

field.width = canvas.width;
field.height = canvas.height;

let player;
let wallStrcture;
const drawable = [];

function init() {
  player = new Player(field, 10, 10);
  drawable.push(player);

  wallStrcture = new WallStructure();

  wallStrcture.add(new Wall(field, 11, 10));
  wallStrcture.add(new Wall(field, 9, 10));
  wallStrcture.add(new Wall(field, 10, 9));
  wallStrcture.add(new Wall(field, 10, 11));
  wallStrcture.add(new Wall(field, 14, 13));
  wallStrcture.add(new Wall(field, 14, 12));
  wallStrcture.add(new Wall(field, 14, 11));
  wallStrcture.add(new Wall(field, 12, 13));
  wallStrcture.add(new Wall(field, 12, 12));
  wallStrcture.add(new Wall(field, 12, 11));

  drawable.push(wallStrcture);

  draw();
}

function step(key) {
  if (
    !wallStrcture.filled(
      player.getX() + stepKeys[key].x,
      player.getY() + stepKeys[key].y
    )
  ) {
    player.turn(stepKeys[key].x, stepKeys[key].y);
    wallStrcture.changeLight(player.getX(), player.getY());
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

// field.__proto__.draw = function () {
//   field.fillStyle = 'black';
//   field.fillRect(0, 0, field.width, field.height);
// };

// const player = new Player(10, 10);

// function animate() {
//   requestAnimationFrame(animate);
//   field.draw();
//   player.draw(field);
// }

// animate();
