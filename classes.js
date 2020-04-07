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
