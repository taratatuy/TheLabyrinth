const cageSize = 20;
const playerSize = 15;

export class Player {
  constructor(field, x, y) {
    this._field = field;
    this._x = x;
    this._y = y;
  }

  getX() {
    return this._x;
  }

  getY() {
    return this._y;
  }

  turn(x = 0, y = 0) {
    this._x += x;
    this._y += y;
  }

  draw() {
    this._field.fillStyle = 'blueviolet';
    this._field.fillRect(
      cageSize * this._x + (cageSize - playerSize) / 2,
      cageSize * this._y + (cageSize - playerSize) / 2,
      playerSize,
      playerSize
    );
  }
}
/* 
export class Wall {
  constructor(field, x, y) {
    this._field = field;
    this.x = x;
    this.y = y;
    this._color = 'blue';
  }

  draw() {
    this._field.fillStyle = this._color;
    this._field.fillRect(
      cageSize * this.x,
      cageSize * this.y,
      cageSize,
      cageSize
    );
  }

  changeCollor(color) {
    this._color = color;
  }
}

export class WallStructure {
  constructor() {
    this._structure = {};
  }

  add(wall) {
    this._structure[wall.x] = { ...this._structure[wall.x], [wall.y]: wall };
  }

  filled(x, y) {
    return this._structure[x] ? this._structure[x][y] : undefined;
  }

  changeLight(x, y) {
    for (let wallX in this._structure) {
      for (let wallY in this._structure[wallX]) {
        if ((wallX - x) * (wallX - x) <= 2 && (wallY - y) * (wallY - y) <= 2) {
          this._structure[wallX][wallY].changeCollor('lightblue');
        } else {
          this._structure[wallX][wallY].changeCollor('blue');
        }
      }
    }
  }

  draw() {
    for (let x in this._structure) {
      for (let y in this._structure[x]) {
        this._structure[x][y].draw();
      }
    }
  }
}
 */
